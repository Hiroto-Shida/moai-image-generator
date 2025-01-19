import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import Label from "../Label";
import styles from "./index.module.scss";

type FormColorProps<TFieldValues extends FieldValues> = Omit<
  React.ComponentProps<"input">,
  "name" | "type"
> & {
  label: string;
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
};

const FormColor = <TFieldValues extends FieldValues>({
  label,
  control,
  name,
  ...props
}: FormColorProps<TFieldValues>) => {
  return (
    <div className={styles.formWrapper}>
      <Label htmlFor={name} variant="gray">
        {label}
      </Label>
      <Controller
        control={control}
        name={name}
        rules={{ required: !!props.required }}
        render={({ field }) => (
          <input
            className={styles.input}
            id={name}
            type="color"
            {...props}
            {...field}
          />
        )}
      />
    </div>
  );
};

export default FormColor;
