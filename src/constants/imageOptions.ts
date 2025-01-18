import { ImageOptionsType } from "@/types/ImageOptionsType";

export const DEFAULT_IMAGE_OPTIONS = {
  image: "happy",
  size: 400,
  c1: "#ff7e5f",
  c2: "#feb47b",
  main: "LGTM",
  sub: "Looks Good To Moai",
} as const satisfies ImageOptionsType;
