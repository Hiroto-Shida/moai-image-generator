import clsx from "clsx";
import styles from "./index.module.scss";

type ToastProps = {
  isOpen: boolean;
  message: string;
};

const Toast: React.FC<ToastProps> = ({ isOpen, message }) => {
  return (
    <div
      className={clsx(styles.toastWrapper, {
        [styles.Active]: isOpen,
      })}
    >
      <p>{message}</p>
    </div>
  );
};

export default Toast;
