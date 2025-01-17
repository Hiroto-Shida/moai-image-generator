import { DEFAULT_IMAGE_OPTIONS } from "@/constants/imageOptions";
import { DEFAULT_IMAGE_SIZE } from "@/constants/imageSize";
import { loadGoogleFont } from "@/utils/font";
import { isImageName } from "@/utils/image";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import React from "react";
import OgpComponent from "../../components/OgpComponent";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams, pathname } = new URL(req.url);

  const inputName = pathname.split("/").pop() || DEFAULT_IMAGE_OPTIONS.image;
  const name = isImageName(inputName) ? inputName : DEFAULT_IMAGE_OPTIONS.image;

  const sizeStr = searchParams.get("size") || String(DEFAULT_IMAGE_SIZE);
  const size = Math.min(
    Math.max(
      isNaN(parseInt(sizeStr, 10)) ? DEFAULT_IMAGE_SIZE : parseInt(sizeStr, 10),
      100
    ),
    400
  );

  // TODO: 正しいカラーコードかどうかのバリデーション
  const c1 = searchParams.get("c1") || DEFAULT_IMAGE_OPTIONS.c1;
  const c2 = searchParams.get("c2") || DEFAULT_IMAGE_OPTIONS.c2;
  const main = searchParams.get("main") || DEFAULT_IMAGE_OPTIONS.main;
  const sub = searchParams.get("sub") || DEFAULT_IMAGE_OPTIONS.sub;
  const imagePath = `${process.env.NEXT_PUBLIC_VERCEL_URL}/images/${name}.png`;

  const fontData = await loadGoogleFont("M+PLUS+1p", main + sub);

  const response = new ImageResponse(
    React.createElement(OgpComponent, { imagePath, size, c1, c2, main, sub }),
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

  // TODO: いらなそうであれば削除
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
