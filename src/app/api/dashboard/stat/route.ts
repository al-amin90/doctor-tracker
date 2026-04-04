import auth from "@/lib/middlewares/auth";
import catchAsync from "@/lib/utils/catchAsync";
import sendResponse from "@/lib/utils/sendResponse";
import { getDashboardStatsService } from "@/modules/dashboard/dashboard.service";
import status from "http-status";
import { NextRequest } from "next/server";

export const GET = catchAsync(
  auth(
    "admin",
    "user",
  )(async (req: NextRequest) => {
    const stats = await getDashboardStatsService();

    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: "Stats fetched",
      data: stats,
    });
  }),
);
