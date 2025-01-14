import OgpComponent from "@/components/OgpComponent";
import styles from "./index.module.scss";
import { IMAGE_LIST } from "@/constants/imageList";
import React from "react";
import { ImageOptionsType } from "@/types/ImageOptionsType";
import { randomImage } from "@/utils/image";
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

const createLineList: () => ImageOptionsType[] = () => {
  const oneLineList: ImageOptionsType[] = [];
  for (let i = 0; i < 5; i++) {
    oneLineList.push(randomImage());
  }
  return oneLineList.concat(oneLineList);
};

type SampleProps = {
  pageUrl: string;
  handleClickImage: (data: ImageOptionsType) => void;
};

const Sample: React.FC<SampleProps> = ({ pageUrl, handleClickImage }) => {
  const firstLineList = createLineList();
  const secondLineList = createLineList();
  const thirdLineList = createLineList();

  return (
    <div className={styles.sampleWrapper}>
      <LineComponent
        pageUrl={pageUrl}
        handleClickImage={handleClickImage}
        lineList={firstLineList}
      />
      <LineComponent
        pageUrl={pageUrl}
        handleClickImage={handleClickImage}
        // delayして表示するため最後の空白に先頭の要素を追加
        lineList={secondLineList.concat(secondLineList[0])}
        delay
      />
      <LineComponent
        pageUrl={pageUrl}
        handleClickImage={handleClickImage}
        lineList={thirdLineList}
      />
    </div>
  );
};

export default React.memo(Sample);
