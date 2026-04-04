import catchAsync from "@/lib/utils/catchAsync";
import sendResponse from "@/lib/utils/sendResponse";
import { authServices } from "@/modules/auth/auth.service";
import { registerValidation } from "@/modules/auth/auth.validation";
import status from "http-status";
import { NextRequest } from "next/server";

export const POST = catchAsync(async (req: NextRequest) => {
  const body = await req.json();

  await registerValidation.parseAsync({ body });
  const user = await authServices.register(body);

  return sendResponse({
    statusCode: status.CREATED,
    success: true,
    message: "Registered successfully",
    data: user,
  });
});
