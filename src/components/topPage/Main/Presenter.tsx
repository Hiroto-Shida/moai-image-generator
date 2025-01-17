import { SubmitHandler } from "react-hook-form";
import { FormType } from ".";

import styles from "./index.module.scss";
import Customize from "../Customize";
import Sample from "../Sample";
import { ImageOptionsType } from "@/types/ImageOptionsType";
import React from "react";

type Props = {
  imageOptions: Omit<ImageOptionsType, "size">;
  onSubmit: SubmitHandler<FormType>;
  handleClickImage: (data: ImageOptionsType) => void;
  lineLists: ImageOptionsType[][];
};

const Presenter: React.FC<Props> = ({
  imageOptions,
  onSubmit,
  handleClickImage,
  lineLists,
}) => {
  return (
    <div className={styles.bodyWrapper}>
      <Customize imageOptions={imageOptions} onSubmit={onSubmit} />
      <Sample handleClickImage={handleClickImage} lineLists={lineLists} />
    </div>
  );
};

export default Presenter;
