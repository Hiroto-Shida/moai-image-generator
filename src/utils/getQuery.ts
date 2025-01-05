export const getQuery = (query: string | string[] | undefined): string => {
  return typeof query === "string" ? query : "";
};
