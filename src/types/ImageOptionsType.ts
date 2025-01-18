import { IMAGE_LIST } from "@/constants/image";

export type ImageOptionsType = {
  image: (typeof IMAGE_LIST)[number];
  size: number;
  c1: string;
  c2: string;
  main: string;
  sub: string;
};
