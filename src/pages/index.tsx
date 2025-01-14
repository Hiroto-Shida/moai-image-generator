import Main from "@/components/topPage/Main";
import { IMAGE_LIST } from "@/constants/imageList";
import { ImageOptionsType } from "@/types/ImageOptionsType";
import { Partial } from "@/types/Partial";
import { getQuery } from "@/utils/getQuery";
import { isImageName, randomImage } from "@/utils/image";
import { InferGetServerSidePropsType, NextPage } from "next";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
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
        imageOptions={{
          image: imageName,
          c1: queryObj.c1,
          c2: queryObj.c2,
          main: queryObj.main,
          sub: queryObj.sub,
        }}
        lineLists={lineLists}
      />
    </>
  );
};

type QueryObjType = Partial<Omit<ImageOptionsType, "image">>;

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
  const c1Query = getQuery(context.query.c1);
  const c2Query = getQuery(context.query.c2);
  const mainQuery = getQuery(context.query.main);
  const subQuery = getQuery(context.query.sub);

  const queryObj: QueryObjType = {};

  if (c1Query) queryObj.c1 = c1Query;
  if (c2Query) queryObj.c2 = c2Query;
  if (mainQuery) queryObj.main = mainQuery;
  if (subQuery) queryObj.sub = subQuery;

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
