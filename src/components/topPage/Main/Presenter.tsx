import { SubmitHandler } from "react-hook-form";
import { FormType } from ".";

import { ImageOptionsType } from "@/types/ImageOptionsType";
import React from "react";
import Customize from "../Customize";
import Sample from "../Sample";
import styles from "./index.module.scss";

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
