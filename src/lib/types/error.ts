import { NextRequest, NextResponse } from "next/server";

export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};

export type Handler = (
  req: NextRequest,
  context?: { params: Record<string, string> },
) => Promise<NextResponse>;
