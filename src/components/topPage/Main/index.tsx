import { ImageOptionsType } from "@/types/ImageOptionsType";
import { randomImage } from "@/utils/image";
import Customize from "../Customize";
import Sample from "../Sample";
import styles from "./index.module.scss";

const Main: React.FC = async () => {
  // const { image, size, c1, c2, main, sub } = pageSearchParamsCache.all();
  // await pageSearchParamsCache.parse(searchParams);

  /**
   * Sampleに表示する画像を生成
   */
  const lineLists: ImageOptionsType[][] = [];
  const createLineList: () => ImageOptionsType[] = () => {
    const oneLineList: ImageOptionsType[] = [];
    for (let i = 0; i < 5; i++) {
      oneLineList.push(randomImage());
    }
    return oneLineList.concat(oneLineList);
  };
  lineLists.push(createLineList());
  lineLists.push(createLineList());
  lineLists.push(createLineList());

  return (
    <div className={styles.bodyWrapper}>
      <Customize pageUrl={process.env.NEXT_PUBLIC_VERCEL_URL || ""} />
      <Sample lineLists={lineLists} />
    </div>
  );
};

export default Main;
