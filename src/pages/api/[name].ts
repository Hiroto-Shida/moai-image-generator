import { ImageResponse } from "@vercel/og";
import OgpComponent from "../../components/OgpComponent";
import React from "react";
import { NextRequest } from "next/server";
import { loadGoogleFont } from "@/utils/font";
import { isImageName } from "@/utils/image";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams, pathname } = new URL(req.url);

  const inputName = pathname.split("/").pop() || "happy";
  const name = isImageName(inputName) ? inputName : "happy";
  const c1 = searchParams.get("c1") || "#ff7e5f";
  const c2 = searchParams.get("c2") || "#feb47b";
  const main = searchParams.get("main") || "LGTM";
  const sub = searchParams.get("sub") || "Looks Good To Moai";
  const imagePath = `${process.env.NEXT_PUBLIC_VERCEL_URL}/images/${name}.png`;

  const size = 400;

  const fontData = await loadGoogleFont("M+PLUS+1p", main + sub);

  const response = new ImageResponse(
    React.createElement(OgpComponent, { imagePath, c1, c2, main, sub, size }),
    {
      width: size,
      height: size,
      fonts: [
        {
          name: "M PLUS 1p",
          data: fontData,
          style: "normal",
          weight: 700,
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
