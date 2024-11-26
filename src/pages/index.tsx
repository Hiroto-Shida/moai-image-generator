import Top from "@/components/Top";
import { imagesList } from "@/constants/imageList";
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
        image={imageName}
        main={queryObj.main}
        sub={queryObj.sub}
      />
    </>
  );
};

interface PageProps {
  pageUrl: string;
  image: string;
  queryObj: { main?: string; sub?: string };
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  // mainクエリパラメータを取得
  const imageQuery = context.query.image;
  const mainQuery =
    typeof context.query.main === "string" ? context.query.main : "";
  const subQuery =
    typeof context.query.sub === "string" ? context.query.sub : "";

  const queryObj: { main?: string; sub?: string } = {};

  if (mainQuery) queryObj.main = mainQuery;
  if (subQuery) queryObj.sub = subQuery;

  return {
    props: {
      pageUrl: process.env.NEXT_PUBLIC_VERCEL_URL || "",
      image: typeof imageQuery === "string" ? imageQuery : "",
      queryObj: queryObj,
    },
  };
};
export default Page;
