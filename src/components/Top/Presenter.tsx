import { SubmitHandler, useFormContext } from "react-hook-form";
import { FormType } from ".";

import styles from "./index.module.scss";

type Props = {
  imageSrc: string | null;
  generatedUrl: string;
  generatedGithubUrl: string;
  onSubmit: SubmitHandler<FormType>;
  handleCopy: (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
};

const Presenter: React.FC<Props> = ({
  generatedUrl,
  generatedGithubUrl,
  onSubmit,
  handleCopy,
  imageSrc,
}) => {
  const { register, handleSubmit } = useFormContext<FormType>();

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.imageWrapper}>
        {imageSrc ? (
          <img src={imageSrc} alt="Generated Image" />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
        <select {...register("image")}>
          <option value="happy">happy</option>
          <option value="good">good</option>
          <option value="appear">appear</option>
          <option value="bow">bow</option>
          <option value="dance">dance</option>
          <option value="fight">fight</option>
          <option value="macho">macho</option>
          <option value="walk">walk</option>
        </select>
        <input {...register("main")} />
        <input {...register("sub")} />

        <button type="submit" className={styles.button}>
          Generate
        </button>
      </form>

      <div className={styles.urlWrapper}>
        <p>URL</p>
        <p className={styles.url} onClick={(e) => handleCopy(e)}>
          {generatedUrl}
        </p>

        <p>markdown</p>
        <p className={styles.url} onClick={(e) => handleCopy(e)}>
          {generatedGithubUrl}
        </p>
      </div>
    </div>
  );
};

export default Presenter;
