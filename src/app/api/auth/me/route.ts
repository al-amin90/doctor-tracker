import catchAsync from "@/lib/utils/catchAsync";
import sendResponse from "@/lib/utils/sendResponse";
import status from "http-status";
import UserModel from "@/modules/auth/auth.model";
import dbConnect from "@/lib/db/mongodb";
import auth from "@/lib/middlewares/auth";

export const GET = catchAsync(
  auth(
    "admin",
    "user",
  )(async (req: any) => {
    await dbConnect();

    const user = await UserModel.findById(req.user.id).select("-password");
    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: "User fetched",
      data: user,
    });
  }),
);
