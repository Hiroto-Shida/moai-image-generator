import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { M_PLUS_1 } from "next/font/google";

const mPlus1 = M_PLUS_1({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={mPlus1.className}>
      <Header />
      <main style={{ marginTop: "40px", backgroundColor: "#ffffff" }}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
