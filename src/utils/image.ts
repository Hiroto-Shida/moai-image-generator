import { IMAGE_LIST } from "@/constants/imageList";
import { ImageOptionsType } from "@/types/ImageOptionsType";

type ImageListType = typeof IMAGE_LIST;

export const isImageName = (value: string): value is ImageListType[number] => {
  return IMAGE_LIST.includes(value as ImageListType[number]);
};

export const randomImage = (): ImageOptionsType => {
  const main = "LGTM";
  const sub = "Looks Good To Moai";

  const colorHex = (num: number) =>
    ("0" + Math.min(Math.max(0, num), 255).toString(16)).slice(-2);

  const image = IMAGE_LIST[Math.floor(Math.random() * IMAGE_LIST.length)];
  const cr1 = Math.floor(Math.random() * 256);
  const cg1 = Math.floor(Math.random() * 256);
  const cb1 = Math.floor(Math.random() * 256);
  const cr2 = cr1 + 40;
  const cg2 = cg1 + 40;
  const cb2 = cb1 + 40;

  return {
    image: image,
    c1: "#" + colorHex(cr1) + colorHex(cg1) + colorHex(cb1),
    c2: "#" + colorHex(cr2) + colorHex(cg2) + colorHex(cb2),
    main,
    sub,
  };
};
