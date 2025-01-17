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
  const { setValue } = useFormContext();

  const value = useWatch({ name });

  const clearInput = () => {
    // @ts-expect-error 空文字 が受け入れられないので無視
    setValue(name, "");
  };

  return (
    <div className={styles.formWrapper}>
      <Label htmlFor={name} variant="gray">
        {label}
      </Label>
      <div className={styles.inputWrapper}>
        <Controller
          control={control}
          name={name}
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
      <div className={styles.underline} />
    </div>
  );
};

export default FormInput;
