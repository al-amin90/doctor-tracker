/* eslint-disable @typescript-eslint/no-explicit-any */
import auth from "@/lib/middlewares/auth";
import catchAsync from "@/lib/utils/catchAsync";
import sendResponse from "@/lib/utils/sendResponse";
import { patientServices } from "@/modules/patient/patient.service";
import status from "http-status";

import { NextRequest } from "next/server";

export const GET = catchAsync(
  auth(
    "admin",
    "user",
  )(async (req: NextRequest, { params }: any) => {
    const { id } = await params;
    const { searchParams } = new URL(req.url);

    const query: Record<string, unknown> = {};
    searchParams.forEach((v, k) => {
      query[k] = v;
    });

    const { data, meta } = await patientServices.getPatientsByDoctor(id, query);

    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: "Patients fetched",
      meta,
      data,
    });
  }),
);
