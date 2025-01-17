import { IMAGE_LIST } from "@/constants/imageList";

export type ImageOptionsType = {
  image: (typeof IMAGE_LIST)[number];
  size: string;
  c1: string;
  c2: string;
  main: string;
  sub: string;
};
