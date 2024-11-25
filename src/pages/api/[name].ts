import { ImageResponse } from "@vercel/og";
import OgpComponent from "../../components/OgpComponent";
import React from "react";
import { NextRequest } from "next/server";
import { robotoBold } from "../../../public/roboto_bold";
import { imagesList } from "@/constants/imageList";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams, pathname } = new URL(req.url);

  const inputName = pathname.split("/").pop() || "happy";
  const name = imagesList.includes(inputName) ? inputName : "happy";
  const main = searchParams.get("main") || "LGTM";
  const sub = searchParams.get("sub") || "Looks Good To Me";
  const imagePath = `${process.env.NEXT_PUBLIC_VERCEL_URL}/images/${name}.png`;

  const size = 400;

  const response = new ImageResponse(
    React.createElement(OgpComponent, { main, sub, imagePath, size }),
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
