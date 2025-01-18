import { ImageOptionsType } from "@/types/ImageOptionsType";

export const DEFAULT_IMAGE_OPTIONS = {
  image: "happy",
  size: 400,
  c1: "#ff7e5f",
  c2: "#feb47b",
  main: "LGTM",
  sub: "Looks Good To Moai",
} as const satisfies ImageOptionsType;

export const IMAGE_LIST = [
  "appear",
  "bow",
  "dance",
  "fight",
  "good",
  "happy",
  "macho",
  "walk",
  "cry",
] as const;

export const IMAGE_SIZE = {
  MIN: 50,
  MAX: 400,
} as const;

// TODO: 選択肢を増やす
export const SAMPLE_IMAGE_TEXT_LIST: {
  main: ImageOptionsType["main"];
  sub: ImageOptionsType["sub"];
}[] = [
  {
    main: "LGTM",
    sub: "Looks Good To Moai",
  },
  {
    main: "MMH",
    sub: "​Make Moai Happy",
  },
  {
    main: "MIH",
    sub: "​Moai Is Happy",
  },
  {
    main: "MFWM",
    sub: "More Fun With Moai",
  },
  {
    main: "MHWM",
    sub: "Magic Happens With Moai",
  },
] as const;
