import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { M_PLUS_1 } from "next/font/google";

const mPlus1 = M_PLUS_1({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={mPlus1.className}>
      <Component {...pageProps} />
    </main>
  );
}
