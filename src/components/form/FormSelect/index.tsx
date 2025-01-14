import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import Label from "../Label";
import styles from "./index.module.scss";
import SelectIcon from "../../../assets/icons/select.svg";

type OptionType = {
  value: string;
  label: string;
};

type FormSelectProps<TFieldValues extends FieldValues> = Omit<
  React.ComponentProps<"select">,
  "name"
> & {
  label: string;
  options: OptionType[];
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
};

const FormSelect = <TFieldValues extends FieldValues>({
  label,
  options,
  control,
  name,
  ...props
}: FormSelectProps<TFieldValues>) => {
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
            <select className={styles.select} id={name} {...props} {...field}>
              {options.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          )}
        />
        <div className={styles.icon}>
          <SelectIcon />
        </div>
      </div>
      <div className={styles.underline} />
    </div>
  );
};

export default FormSelect;
