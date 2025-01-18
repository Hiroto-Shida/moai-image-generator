import clsx from "clsx";
import DownloadIcon from "../../../assets/icons/download.svg";

import styles from "./index.module.scss";

type DownloadButtonProps = {
  variant?: "black" | "primary";
  type: "download";
  fileName: string;
  href: string;
  disabled?: boolean;
  children: React.ReactNode;
};

const DownloadButton: React.FC<DownloadButtonProps> = ({
  variant = "black",
  fileName,
  href,
  disabled = false,
  children,
}) => {
  return (
    <a
      href={href}
      download={fileName}
      className={clsx(styles.buttonStyle, {
        [styles.Black]: !disabled && variant === "black",
        [styles.Primary]: !disabled && variant === "primary",
        [styles.Disabled]: disabled,
      })}
    >
      <DownloadIcon className={styles.icon} />
      <p className={styles.text}>{children}</p>
    </a>
  );
};

type NormalButtonProps = {
  variant?: "black" | "primary";
  type?: "button" | "submit";
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

const NormalButton: React.FC<NormalButtonProps> = ({
  variant = "black",
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

const Button: React.FC<NormalButtonProps | DownloadButtonProps> = (props) => {
  if (props.type === "download") return <DownloadButton {...props} />;
  return <NormalButton {...props} />;
};

export default Button;
