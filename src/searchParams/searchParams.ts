import { DEFAULT_IMAGE_OPTIONS, IMAGE_LIST } from "@/constants/image";
import { isColorCode } from "@/utils/color";
import { isCorrectImageSize } from "@/utils/image";
import {
  createLoader,
  createParser,
  createSearchParamsCache,
  parseAsStringLiteral,
} from "nuqs/server";

const parseAsSize = createParser({
  parse(queryValue) {
    if (!isCorrectImageSize(queryValue)) return DEFAULT_IMAGE_OPTIONS.size;
    return Number(queryValue);
  },
  serialize(value) {
    return String(value);
  },
});

const hexColorSchema = (color: "c1" | "c2") =>
  createParser({
    parse(query) {
      if (!isColorCode(query)) {
        return color === "c1"
          ? DEFAULT_IMAGE_OPTIONS.c1
          : DEFAULT_IMAGE_OPTIONS.c2;
      }
      return query;
    },
    serialize(value) {
      return value;
    },
  });

const parseAndCutAsString = (maxLength: number) =>
  createParser({
    parse(query) {
      return query.slice(0, maxLength);
    },
    serialize(value) {
      return value;
    },
  });

export const pageSearchParams = {
  image: parseAsStringLiteral(IMAGE_LIST).withDefault(
    DEFAULT_IMAGE_OPTIONS.image
  ),
  // main, subにそれぞれクエリバリデーション的なのがほしい
  size: parseAsSize.withDefault(DEFAULT_IMAGE_OPTIONS.size),
  c1: hexColorSchema("c1").withDefault(DEFAULT_IMAGE_OPTIONS.c1),
  c2: hexColorSchema("c2").withDefault(DEFAULT_IMAGE_OPTIONS.c2),
  main: parseAndCutAsString(100).withDefault(DEFAULT_IMAGE_OPTIONS.main),
  sub: parseAndCutAsString(200).withDefault(DEFAULT_IMAGE_OPTIONS.sub),
};

// つかわない？
export const loadPageSearchParams = createLoader(pageSearchParams);

export const pageSearchParamsCache = createSearchParamsCache(pageSearchParams);
