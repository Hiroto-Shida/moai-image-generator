import GithubIcon from "../../assets/icons/github-mark.svg";
import styles from "./index.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.headerStyle}>
      {/* TODO: 画像をLGTMモアイにする */}
      <img src="/images/happy.png" alt="logo" className={styles.logo} />
      <h1 className={styles.title}>Moai Image Generator</h1>
      <a
        href="https://github.com/Hiroto-Shida/moai-image-generator"
        className={styles.githubIcon}
        target="_blank"
      >
        <GithubIcon className={styles.icon} />
      </a>
    </header>
  );
};

export default Header;
