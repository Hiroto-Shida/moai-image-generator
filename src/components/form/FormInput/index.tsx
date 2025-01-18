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
  "name"
> & {
  label: string;
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
};

const FormInput = <TFieldValues extends FieldValues>({
  label,
  control,
  name,
  ...props
}: FormInputProps<TFieldValues>) => {
  const {
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const value = useWatch({ name });

  const clearInput = () => {
    // @ts-expect-error 空文字 が受け入れられないので無視
    setValue(name, "");
    trigger(name);
  };

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
            <input className={styles.input} id={name} {...props} {...field} />
          )}
        />
        <button
          className={clsx(styles.icon, {
            [styles.Hidden]: value === "",
          })}
          type="button"
          onClick={clearInput}
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
