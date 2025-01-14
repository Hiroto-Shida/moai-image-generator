import clsx from "clsx";
import DownloadIcon from "../../../assets/icons/download.svg";

import styles from "./index.module.scss";

type ButtonProps = {
  variant?: "black" | "primary";
  type?: "button" | "submit";
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  variant = "blacks",
  type = "button",
  children,
}) => {
  return (
    <button
      type={type}
      className={clsx(styles.buttonStyle, {
        [styles.Black]: variant === "black",
        [styles.Primary]: variant === "primary",
      })}
    >
      <DownloadIcon className={styles.icon} />
      <p className={styles.text}>{children}</p>
    </button>
  );
};

export default Button;
