import Top from "@/components/Top";
import { imagesList } from "@/constants/imageList";
import { getQuery } from "@/utils/getQuery";
import { InferGetServerSidePropsType, NextPage } from "next";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";

const Page: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ pageUrl, image, queryObj }) => {
  const imageName = imagesList.includes(image) ? image : "happy";
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
      <Top
        pageUrl={pageUrl}
        imageOptions={{
          image: imageName,
          c1: queryObj.c1,
          c2: queryObj.c2,
          main: queryObj.main,
          sub: queryObj.sub,
        }}
      />
    </>
  );
};

type QueryObjType = {
  c1?: string;
  c2?: string;
  main?: string;
  sub?: string;
};
interface PageProps {
  pageUrl: string;
  image: string;
  queryObj: QueryObjType;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  // mainクエリパラメータを取得
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

  return {
    props: {
      pageUrl: process.env.NEXT_PUBLIC_VERCEL_URL || "",
      image: imageQuery,
      queryObj: queryObj,
    },
  };
};
export default Page;
