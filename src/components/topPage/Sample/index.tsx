import OgpComponent from "@/components/OgpComponent";
import { IMAGE_LIST } from "@/constants/imageList";
import { ImageOptionsType } from "@/types/ImageOptionsType";
import clsx from "clsx";
import React from "react";
import styles from "./index.module.scss";

type LineComponentProps = {
  handleClickImage: (data: ImageOptionsType) => void;
  lineList: ImageOptionsType[];
  delay?: boolean;
};

const LineComponent: React.FC<LineComponentProps> = ({
  handleClickImage,
  lineList,
  delay = false,
}) => {
  const imagePath = (image: (typeof IMAGE_LIST)[number]) =>
    `/images/${image}.png`;
  return (
    <div
      className={clsx(styles.lineWrapper, {
        [styles.Delay]: delay,
      })}
    >
      {lineList.map((line, index) => (
        <button
          className={styles.image}
          key={index}
          onClick={() => handleClickImage(line)}
        >
          <OgpComponent
            imagePath={imagePath(line.image)}
            c1={line.c1}
            c2={line.c2}
            main={line.main}
            sub={line.sub}
            size={100}
            isOgp={false}
          />
        </button>
      ))}
    </div>
  );
};

type SampleProps = {
  handleClickImage: (data: ImageOptionsType) => void;
  lineLists: ImageOptionsType[][];
};

const Sample: React.FC<SampleProps> = ({ handleClickImage, lineLists }) => {
  return (
    <div className={styles.sampleWrapper}>
      {lineLists.map((lineList, index) => (
        <LineComponent
          key={index}
          handleClickImage={handleClickImage}
          lineList={index % 2 === 1 ? lineList.concat(lineList[0]) : lineList}
          delay={index % 2 === 1}
        />
      ))}
    </div>
  );
};

export default Sample;
