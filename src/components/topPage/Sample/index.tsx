import OgpComponent from "@/components/OgpComponent";
import styles from "./index.module.scss";
import { IMAGE_LIST } from "@/constants/imageList";
import React from "react";
import { ImageOptionsType } from "@/types/ImageOptionsType";
import clsx from "clsx";

type LineComponentProps = {
  pageUrl: string;
  handleClickImage: (data: ImageOptionsType) => void;
  lineList: ImageOptionsType[];
  delay?: boolean;
};

const LineComponent: React.FC<LineComponentProps> = ({
  pageUrl,
  handleClickImage,
  lineList,
  delay = false,
}) => {
  const imagePath = (image: (typeof IMAGE_LIST)[number]) =>
    `${pageUrl}/images/${image}.png`;
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
  pageUrl: string;
  handleClickImage: (data: ImageOptionsType) => void;
  lineLists: ImageOptionsType[][];
};

const Sample: React.FC<SampleProps> = ({
  pageUrl,
  handleClickImage,
  lineLists,
}) => {
  return (
    <div className={styles.sampleWrapper}>
      {lineLists.map((lineList, index) => (
        <LineComponent
          key={index}
          pageUrl={pageUrl}
          handleClickImage={handleClickImage}
          lineList={index % 2 === 1 ? lineList.concat(lineList[0]) : lineList}
          delay={index % 2 === 1}
        />
      ))}
    </div>
  );
};

export default Sample;
