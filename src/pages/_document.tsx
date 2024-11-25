import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  // const timestamp = new Date().getTime(); // 現在の時間をミリ秒単位で取得

  return (
    <Html lang="ja">
      <Head>
        <link rel="icon" href="/images/happy.png" />
        {/* <meta
          property="og:image"
          content={`https://dynamic-ogp-moai.vercel.app/api/happy?${timestamp}`}
        /> */}
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
