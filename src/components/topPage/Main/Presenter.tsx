import { SubmitHandler } from "react-hook-form";
import { FormType } from ".";

import styles from "./index.module.scss";
import Customize from "../Customize";
import Sample from "../Sample";
import { ImageOptionsType } from "@/types/ImageOptionsType";

type Props = {
  // imageSrc: string | null;
  // generatedUrl: string;
  // generatedGithubUrl: string;
  pageUrl: string;
  imageOptions: ImageOptionsType;
  onSubmit: SubmitHandler<FormType>;
  // handleCopy: (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
  // isOpenToast: boolean;
  handleClickImage: (data: ImageOptionsType) => void;
};

const Presenter: React.FC<Props> = ({
  // imageSrc,
  // generatedUrl,
  // generatedGithubUrl,
  pageUrl,
  imageOptions,
  onSubmit,
  // handleCopy,
  // isOpenToast,
  handleClickImage,
}) => {
  return (
    <div className={styles.bodyWrapper}>
      <Customize
        pageUrl={pageUrl}
        imageOptions={imageOptions}
        onSubmit={onSubmit}
      />
      <Sample pageUrl={pageUrl} handleClickImage={handleClickImage} />
    </div>
  );
};

export default Presenter;
