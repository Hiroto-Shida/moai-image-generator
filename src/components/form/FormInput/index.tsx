import clsx from "clsx";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
  useWatch,
} from "react-hook-form";
import ClearIcon from "../../../assets/icons/clear.svg";
import Label from "../Label";
import styles from "./index.module.scss";

type FormInputProps<TFieldValues extends FieldValues> = Omit<
  React.ComponentProps<"input">,
  "name" | "onChange"
> & {
  label: string;
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  handleChange: (value: string) => void;
};

const FormInput = <TFieldValues extends FieldValues>({
  label,
  control,
  name,
  handleChange,
  ...props
}: FormInputProps<TFieldValues>) => {
  const {
    formState: { errors },
  } = useFormContext();

  const value = useWatch({ name });

  return (
    <div className={styles.formWrapper}>
      <Label htmlFor={name} variant={errors[name] ? "error" : "gray"}>
        {label}
      </Label>
      <div className={styles.inputWrapper}>
        <Controller
          control={control}
          name={name}
          rules={{ required: !!props.required }}
          render={({ field }) => (
            <input
              className={styles.input}
              id={name}
              {...props}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleChange(e.target.value);
              }}
              value={props.value}
              placeholder={props.placeholder}
            />
          )}
        />
        <button
          className={clsx(styles.icon, {
            [styles.Hidden]: value === "",
          })}
          type="button"
          onClick={() => handleChange("")}
        >
          <ClearIcon />
        </button>
      </div>
      <div
        className={clsx(styles.underline, {
          [styles.Error]: errors[name],
        })}
      />
    </div>
  );
};

export default FormInput;
