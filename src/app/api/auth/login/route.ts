import { NextRequest, NextResponse } from "next/server";

import { loginValidation } from "@/modules/auth/auth.validation";
import catchAsync, { handleError } from "@/lib/utils/catchAsync";
import sendResponse from "@/lib/utils/sendResponse";
import { authServices } from "@/modules/auth/auth.service";

export const POST = catchAsync(async (req: NextRequest) => {
  const body = await req.json();
  await loginValidation.parseAsync({ body });
  const result = await authServices.login(body);

  const response = sendResponse({
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: { user: result.user, accessToken: result.accessToken },
  });

  response.cookies.set("accessToken", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  response.cookies.set("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
});
