import { useCallback, useEffect, useRef } from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  useWatch,
} from "react-hook-form";
import Label from "../Label";
import styles from "./index.module.scss";

type FormRangeProps<TFieldValues extends FieldValues> = Omit<
  React.ComponentProps<"input">,
  "name"
> & {
  label: string;
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  inputRange: {
    min: number;
    max: number;
    step: number;
  };
  onChange: (value: string) => void;
};

const FormRange = <TFieldValues extends FieldValues>({
  label,
  control,
  name,
  inputRange,
  onChange,
  ...props
}: FormRangeProps<TFieldValues>) => {
  const value = useWatch({ name });

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeColor = useCallback(
    (value: string) => {
      if (!inputRef.current) return;
      const progress =
        ((Number(value) - inputRange.min) / (inputRange.max - inputRange.min)) *
        100;
      inputRef.current.style.background = `linear-gradient(to right, rgba(242, 135, 5) ${progress}%, rgba(0, 0, 0, 0.87) ${progress}%)`;
    },
    [inputRange.max, inputRange.min]
  );

  useEffect(() => {
    if (!inputRef.current) return;

    handleChangeColor(value);
  }, [handleChangeColor, value]);

  return (
    <div className={styles.formWrapper}>
      <Label htmlFor={name} variant="black">
        {label}
      </Label>
      <div className={styles.inputWrapper}>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <input
              {...props}
              {...field}
              ref={inputRef}
              className={styles.input}
              type="range"
              id={name}
              min={inputRange.min}
              max={inputRange.max}
              step={inputRange.step}
              onChange={(e) => {
                field.onChange(e);
                onChange(e.currentTarget.value);
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default FormRange;
