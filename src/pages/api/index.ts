import { ImageResponse } from "@vercel/og";
import OgpComponent from "../../components/OgpComponent";
import React from "react";
import { NextRequest } from "next/server";
import { robotoBold } from "../../../public/roboto_bold";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const url = new URL(req.url);
  const title = url.searchParams.get("title") || "LGTM";
  const subTitle = url.searchParams.get("subTitle") || "Looks Good To Me";

  // 現在の時刻を用いて、1-8までのランダムな数値を生成
  const timestamp = new Date().getTime(); // 現在の時間をミリ秒単位で取得
  const num = (timestamp % 8) + 1;
  const imagePath = `${process.env.NEXT_PUBLIC_VERCEL_URL}/images/${num}.png`;

  const size = 400;

  const response = new ImageResponse(
    React.createElement(OgpComponent, { title, subTitle, imagePath, size }),
    {
      width: size,
      height: size,
      fonts: [
        {
          name: "Roboto",
          data: Buffer.from(robotoBold.split(",")[1], "base64"),
          style: "normal",
          weight: 400,
        },
      ],
    }
  );

  // cacheの無効化設定
  // MEMO: ブラウザでキャッシュしている場合はこれでも対応不可能
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  response.headers.set("Expires", "0");
  response.headers.set("Pragma", "no-cache");

  return response;
}
