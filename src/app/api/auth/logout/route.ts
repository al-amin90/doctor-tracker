import {  NextResponse } from "next/server";

import catchAsync from "@/lib/utils/catchAsync";

export const POST = catchAsync(async () => {
  const response = NextResponse.json({
    success: true,
    message: "Logged out",
    data: null,
  });
  response.cookies.set("accessToken", "", { maxAge: 0, path: "/" });
  response.cookies.set("refreshToken", "", { maxAge: 0, path: "/" });
  return response;
});
