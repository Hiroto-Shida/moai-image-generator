import clsx from "clsx";
import DownloadIcon from "../../../assets/icons/download.svg";

import styles from "./index.module.scss";

type ButtonProps = {
  variant?: "black" | "primary";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  variant = "blacks",
  type = "button",
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      className={clsx(styles.buttonStyle, {
        [styles.Black]: !disabled && variant === "black",
        [styles.Primary]: !disabled && variant === "primary",
        [styles.Disabled]: disabled,
      })}
      onClick={!disabled ? onClick : () => {}}
    >
      <DownloadIcon className={styles.icon} />
      <p className={styles.text}>{children}</p>
    </button>
  );
};

export default Button;
