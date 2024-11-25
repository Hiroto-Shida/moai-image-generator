import Top from "@/components/Top";
import { imagesList } from "@/constants/imageList";
import { InferGetServerSidePropsType, NextPage } from "next";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";

const Page: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ pageUrl, image, main, sub }) => {
  const name = imagesList.includes(image) ? image : "happy";
  const url =
    `/api/${name}` +
    `${main || sub ? "?" : ""}` +
    `${main ? `main=${main}` : ""}` +
    `${main && sub ? "&" : ""}` +
    `${sub ? `sub=${sub}` : ""}`;

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
      <Top pageUrl={pageUrl} />
    </>
  );
};

interface PageProps {
  pageUrl: string;
  image: string;
  main: string;
  sub: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  // mainクエリパラメータを取得
  const imageQuery = context.query.image;
  const mainQuery = context.query.main;
  const subQuery = context.query.sub;

  return {
    props: {
      pageUrl: process.env.NEXT_PUBLIC_VERCEL_URL || "",
      image: typeof imageQuery === "string" ? imageQuery : "",
      main: typeof mainQuery === "string" ? mainQuery : "",
      sub: typeof subQuery === "string" ? subQuery : "",
    },
  };
};
export default Page;
