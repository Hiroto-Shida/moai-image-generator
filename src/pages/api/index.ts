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

  const num = Math.floor(Math.random() * 8) + 1;
  const imagePath = `${process.env.NEXT_PUBLIC_VERCEL_URL}/images/${num}.png`;

  const size = 400;

  return new ImageResponse(
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
}
