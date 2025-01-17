import clsx from "clsx";

import styles from "./index.module.scss";

type LabelProps = {
  htmlFor?: string;
  variant: "black" | "gray";
  children: React.ReactNode;
};

const Label: React.FC<LabelProps> = ({ htmlFor, variant, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(styles.labelStyle, {
        [styles.Black]: variant === "black",
        [styles.Gray]: variant === "gray",
      })}
    >
      {children}
    </label>
  );
};

export default Label;
