/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";
import { ZodError } from "zod";
import config from "@/config";
import { Handler } from "@/modules/auth/auth.interface";

const catchAsync = (fn: Handler): Handler => {
  return async (req: NextRequest, context?: any) => {
    try {
      return await fn(req, context);
    } catch (error) {
      return handleError(error);
    }
  };
};

export function handleError(err: any): NextResponse {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources;

  if (err instanceof ZodError) {
    const s = handleZodError(err);
    statusCode = s.statusCode;
    message = s.message;
    errorSources = s.errorSources;
  } else if (err?.name === "ValidationError") {
    const s = handleValidationError(err);
    statusCode = s.statusCode;
    message = s.message;
    errorSources = s.errorSources;
  } else if (err?.name === "CastError") {
    const s = handleCastError(err);
    statusCode = s.statusCode;
    message = s.message;
    errorSources = s.errorSources;
  } else if (err?.code === 11000) {
    const s = handleDuplicateError(err);
    statusCode = s.statusCode;
    message = s.message;
    errorSources = s.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [{ path: "", message: err.message }];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [{ path: "", message: err.message }];
  }

  return NextResponse.json(
    {
      success: false,
      message,
      errorSources,
      stack: process.env.NODE_ENV === "development" ? err?.stack : null,
    },
    { status: statusCode },
  );
}

export default catchAsync;
