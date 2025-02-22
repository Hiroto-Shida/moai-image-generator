import { DEFAULT_IMAGE_OPTIONS } from "@/constants/image";
import { isColorCode } from "@/utils/color";
import { loadGoogleFont } from "@/utils/font";
import { isCorrectImageSize, isImageName } from "@/utils/image";
import { cutText } from "@/utils/text";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import React from "react";
import OgpComponent from "../../../components/OgpComponent";

export const runtime = "edge";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ image: string }> }
) {
  const { searchParams } = new URL(req.url);

  const inputName = (await params).image || DEFAULT_IMAGE_OPTIONS.image;
  const name = isImageName(inputName) ? inputName : DEFAULT_IMAGE_OPTIONS.image;
  const imagePath = `${process.env.NEXT_PUBLIC_VERCEL_URL}/images/${name}.png`;

  const sizeStr =
    searchParams.get("size") || String(DEFAULT_IMAGE_OPTIONS.size);
  const size = isCorrectImageSize(sizeStr)
    ? Number(sizeStr)
    : DEFAULT_IMAGE_OPTIONS.size;

  const c1Query = searchParams.get("c1");
  const c2Query = searchParams.get("c2");
  const mainQuery = searchParams.get("main");
  const subQuery = searchParams.get("sub");

  const c1 =
    c1Query && isColorCode(c1Query) ? c1Query : DEFAULT_IMAGE_OPTIONS.c1;
  const c2 =
    c2Query && isColorCode(c2Query) ? c2Query : DEFAULT_IMAGE_OPTIONS.c2;
  const main = mainQuery ? cutText(mainQuery, 100) : DEFAULT_IMAGE_OPTIONS.main;
  const sub = subQuery ? cutText(subQuery, 200) : DEFAULT_IMAGE_OPTIONS.sub;

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

  return response;
}
