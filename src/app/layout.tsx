import Header from "@/components/Header";
import "@/styles/globals.scss";
import { Metadata } from "next";
import { M_PLUS_1 } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const mPlus1 = M_PLUS_1({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "moai-image-generator",
  description: "Generate LGTM Moai images",
  openGraph: {
    type: "website",
    title: "moai-image-generator",
    description: "Generate LGTM Moai images",
    images: {
      // デフォルトの画像を設定
      url: new URL("api/happy", process.env.NEXT_PUBLIC_VERCEL_URL),
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mPlus1.className}>
        <NuqsAdapter>
          <Header />
          <main style={{ marginTop: "40px" }}>{children}</main>
        </NuqsAdapter>
      </body>
    </html>
  );
}
