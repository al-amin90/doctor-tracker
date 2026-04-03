import { NextRequest, NextResponse } from "next/server";

import { handleError } from "@/lib/utils/catchAsync";
import { AnyZodObject } from "zod/v3";
import { ZodError } from "zod";

const validateRequest = (schema: AnyZodObject) => {
  return async (
    req: NextRequest,
    handler: (req: NextRequest) => Promise<NextResponse>,
  ): Promise<NextResponse> => {
    try {
      const body = await req.json().catch(() => ({}));
      await schema.parseAsync({ body });

      const newReq = new Request(req.url, {
        method: req.method,
        headers: req.headers,
        body: JSON.stringify(body),
      });

      return await handler(Object.assign(newReq, req) as NextRequest);
    } catch (err) {
      return handleError(err);
    }
  };
};

export default validateRequest;
