import styles from "./index.module.scss";
import CopyIcon from "../../../assets/icons/copy.svg";

type UrlButtonProps = {
  url: string;
  handleClick: (text: string) => void;
};

const UrlButton: React.FC<UrlButtonProps> = ({ url, handleClick }) => {
  return (
    <button className={styles.urlButton} onClick={() => handleClick(url)}>
      <input className={styles.url} value={url} readOnly />
      <div className={styles.iconWrapper}>
        <CopyIcon />
      </div>
    </button>
  );
};

export default UrlButton;
