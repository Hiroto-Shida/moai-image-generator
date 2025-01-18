import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  // const timestamp = new Date().getTime(); // 現在の時間をミリ秒単位で取得

  return (
    <Html lang="ja">
      <Head>
        {/* TODO: 画像をLGTMモアイにする */}
        <link rel="icon" href="/images/happy.png" />
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
