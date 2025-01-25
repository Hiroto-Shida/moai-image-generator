import { DEFAULT_IMAGE_OPTIONS } from "@/constants/image";
import { ImageOptionsType } from "@/types/ImageOptionsType";
import { isColorCode } from "./color";
import { isCorrectImageSize, isImageName } from "./image";
import { cutText } from "./text";

export const getQuery = (query: string | string[] | undefined): string => {
  return typeof query === "string" ? query : "";
};

export type SearchParamsProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

type QueryObjType = Partial<Omit<ImageOptionsType, "image" | "size">> & {
  image: ImageOptionsType["image"];
  size?: string;
};

export const convertQueryToObj = async ({
  searchParams,
}: SearchParamsProps): Promise<QueryObjType> => {
  const sParams = await searchParams;

  const imageQuery = getQuery(sParams.image);
  const sizeQuery = getQuery(sParams.size);
  const c1Query = getQuery(sParams.c1);
  const c2Query = getQuery(sParams.c2);
  const mainQuery = getQuery(sParams.main);
  const subQuery = getQuery(sParams.sub);

  const queryObj: QueryObjType = {
    image: isImageName(imageQuery) ? imageQuery : DEFAULT_IMAGE_OPTIONS.image,
  };

  if (
    sizeQuery &&
    isCorrectImageSize(sizeQuery) &&
    sizeQuery !== String(DEFAULT_IMAGE_OPTIONS.size)
  )
    queryObj.size = sizeQuery;
  if (c1Query && isColorCode(c1Query) && c1Query !== DEFAULT_IMAGE_OPTIONS.c1)
    queryObj.c1 = c1Query;
  if (c2Query && isColorCode(c2Query) && c2Query !== DEFAULT_IMAGE_OPTIONS.c2)
    queryObj.c2 = c2Query;
  if (mainQuery && mainQuery !== DEFAULT_IMAGE_OPTIONS.main)
    queryObj.main = cutText(mainQuery, 100);
  if (subQuery && subQuery !== DEFAULT_IMAGE_OPTIONS.sub)
    queryObj.sub = cutText(subQuery, 200);

  return queryObj;
};
