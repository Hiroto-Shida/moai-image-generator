import Main from "@/components/topPage/Main";
import { pageSearchParamsCache } from "@/searchParams/searchParams";
import { convertQueryToObj, SearchParamsProps } from "@/utils/query";
import { Metadata, NextPage } from "next";
import { type SearchParams } from "nuqs/server";

export async function generateMetadata({
  searchParams,
}: SearchParamsProps): Promise<Metadata> {
  const queryObj = await convertQueryToObj({ searchParams });

  const queryStr = new URLSearchParams(queryObj).toString();
  const url = queryStr
    ? `/api/${queryObj.image}?${queryStr}`
    : `/api/${queryObj.image}`;

  return {
    title: "moai-image-generator",
    description: "Generate LGTM Moai images",
    openGraph: {
      type: "website",
      title: "moai-image-generator",
      description: "Generate LGTM Moai images",
      images: {
        url: new URL(url, process.env.NEXT_PUBLIC_VERCEL_URL),
      },
    },
  };
}

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const Page: NextPage<PageProps> = async ({ searchParams }) => {
  // ここで呼んでおくことで、子コンポーネントでcacheを受け取れる？
  await pageSearchParamsCache.parse(searchParams);

  return <Main />;
};

export default Page;
