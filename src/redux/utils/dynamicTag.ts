import { TReduxQuery } from "../types";

export const dynamicTag = (
  _result: unknown,
  _err: unknown,
  { url }: TReduxQuery,
) => {
  const tag = url.split("/").filter(Boolean)[0];
  return [{ type: tag as never }];
};
