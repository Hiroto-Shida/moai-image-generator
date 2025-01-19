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

export const SAMPLE_IMAGE_TEXT_LIST: {
  main: ImageOptionsType["main"];
  sub: ImageOptionsType["sub"];
}[] = [
  {
    main: "LGTM",
    sub: "Looks Good To Moai",
  },
  {
    main: "LGTM",
    sub: "Let's Groove To Moai",
  },
  {
    main: "LGTM",
    sub: "Live Greatly, Trust Moai",
  },
  {
    main: "MMMM",
    sub: "Moai Moai Moai Moai",
  },
  {
    main: "MBTI",
    sub: "Moai Beyond Time Itself",
  },
  {
    main: "OMG",
    sub: "Oh Moai's God",
  },
  {
    main: "IMHO",
    sub: "In Moai Humble Opinion",
  },
  {
    main: "PM",
    sub: "Professional Moai",
  },
  {
    main: "BGM",
    sub: "Background Moai",
  },
  {
    main: "CMS",
    sub: "Content Moai System",
  },
  {
    main: "DMP",
    sub: "Data Moai Platform",
  },
  {
    main: "HTML",
    sub: "History Told by Moai",
  },
  {
    main: "TEAM",
    sub: "To Each, A Moai",
  },
] as const;
