import Main from "@/components/topPage/Main";
import { DEFAULT_IMAGE_OPTIONS, IMAGE_LIST } from "@/constants/image";
import { ImageOptionsType } from "@/types/ImageOptionsType";
import { Partial } from "@/types/Partial";
import { isColorCode } from "@/utils/color";
import { getQuery } from "@/utils/getQuery";
import { isCorrectImageSize, isImageName, randomImage } from "@/utils/image";
import { cutText } from "@/utils/text";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";

const Page: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ pageUrl, image, queryObj, lineLists }) => {
  const imageName: (typeof IMAGE_LIST)[number] = isImageName(image)
    ? image
    : "happy";
  const queryStr = new URLSearchParams(queryObj).toString();
  const url = queryStr ? `/api/${imageName}?${queryStr}` : `/api/${imageName}`;

  return (
    <>
      <Head>
        {/* TODO: LGTMモアイにする */}
        <link rel="icon" href="/images/happy.png" />
        <meta property="og:image" content={`${pageUrl}${url}`} />
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Head>
      <Main
        pageUrl={pageUrl}
        initImageOptions={{
          image: imageName,
          size: queryObj.size
            ? Number(queryObj.size)
            : DEFAULT_IMAGE_OPTIONS.size,
          c1: queryObj.c1 || DEFAULT_IMAGE_OPTIONS.c1,
          c2: queryObj.c2 || DEFAULT_IMAGE_OPTIONS.c2,
          main: queryObj.main || DEFAULT_IMAGE_OPTIONS.main,
          sub: queryObj.sub || DEFAULT_IMAGE_OPTIONS.sub,
        }}
        lineLists={lineLists}
      />
    </>
  );
};

type QueryObjType = Partial<Omit<ImageOptionsType, "image" | "size">> & {
  size?: string;
};

interface PageProps {
  pageUrl: string;
  image: string;
  queryObj: QueryObjType;
  lineLists: ImageOptionsType[][];
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  /**
   * クエリパラメータを取得と整理
   */
  const imageQuery = getQuery(context.query.image);
  const sizeQuery = getQuery(context.query.size);
  const c1Query = getQuery(context.query.c1);
  const c2Query = getQuery(context.query.c2);
  const mainQuery = getQuery(context.query.main);
  const subQuery = getQuery(context.query.sub);

  const queryObj: QueryObjType = {};

  if (
    sizeQuery &&
    isCorrectImageSize(sizeQuery) &&
    sizeQuery !== String(DEFAULT_IMAGE_OPTIONS.size)
  )
    queryObj.size = sizeQuery;
  if (c1Query && isColorCode(c1Query) && c1Query !== DEFAULT_IMAGE_OPTIONS.c1)
    queryObj.c1 = c1Query;
  if (c2Query && isColorCode(c2Query) && c2Query !== DEFAULT_IMAGE_OPTIONS.c2)
    queryObj.c2 = c2Query;
  if (mainQuery && mainQuery !== DEFAULT_IMAGE_OPTIONS.main)
    queryObj.main = cutText(mainQuery, 100);
  if (subQuery && subQuery !== DEFAULT_IMAGE_OPTIONS.sub)
    queryObj.sub = cutText(subQuery, 200);

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

  return {
    props: {
      pageUrl: process.env.NEXT_PUBLIC_VERCEL_URL || "",
      image: imageQuery,
      queryObj: queryObj,
      lineLists,
    },
  };
};
export default Page;
