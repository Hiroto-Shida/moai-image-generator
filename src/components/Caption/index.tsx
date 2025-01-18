import InfoIcon from "../../assets/icons/info.svg";

import styles from "./index.module.scss";

type CaptionProps = {
  children: React.ReactNode;
};

const Caption: React.FC<CaptionProps> = ({ children }) => {
  return (
    <div className={styles.captionWrapper}>
      <InfoIcon className={styles.icon} />
      <p className={styles.caption}>{children}</p>
    </div>
  );
};

export default Caption;
