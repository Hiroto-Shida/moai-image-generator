import Top from "@/components/Top";
import { InferGetServerSidePropsType, NextPage } from "next";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";

const Page: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ pageUrl, title, subTitle }) => {
  const timestamp = new Date().getTime(); // 現在の時間をミリ秒単位で取得
  const name = "happy";
  const url =
    `/api/${name}` +
    `${title || subTitle ? "?" : ""}` +
    `${title ? `title=${title}` : ""}` +
    `${title && subTitle ? "&" : ""}` +
    `${subTitle ? `subTitle=${subTitle}` : ""}`;

  // console.log("pageUrl", pageUrl);
  // console.log("url", `${pageUrl}${url}?${timestamp}`);

  return (
    <>
      <Head>
        <link rel="icon" href="/images/happy.png" />
        <meta property="og:image" content={`${pageUrl}${url}?${timestamp}`} />
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
  title: string;
  subTitle: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  // titleクエリパラメータを取得
  const titleQuery = context.query.title;
  const subTitleQuery = context.query.subTitle;
  // if (typeof titleQuery === "string") {
  //   console.log("title", titleQuery);
  // }
  // if (typeof subTitleQuery === "string") {
  //   console.log("subTitle", subTitleQuery);
  // }

  return {
    props: {
      pageUrl: process.env.NEXT_PUBLIC_VERCEL_URL || "",
      title: typeof titleQuery === "string" ? titleQuery : "",
      subTitle: typeof subTitleQuery === "string" ? subTitleQuery : "",
    },
  };
};
export default Page;
