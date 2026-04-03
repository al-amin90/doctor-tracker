import { NextResponse } from "next/server";

type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: TMeta;
  data: T;
};

const sendResponse = <T>(data: TResponse<T>): NextResponse => {
  const body: Record<string, unknown> = {
    success: data.success,
    message: data.message,
    data: data.data ?? null,
  };

  if (data.meta) body.meta = data.meta;

  return NextResponse.json(body, { status: data.statusCode });
};

export default sendResponse;
