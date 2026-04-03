/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from "@/lib/utils/catchAsync";
import sendResponse from "@/lib/utils/sendResponse";
import { doctorServices } from "@/modules/doctor/doctor.service";
import { updateDoctorValidation } from "@/modules/doctor/doctor.validation";
import status from "http-status";

import { NextRequest } from "next/server";

export const GET = catchAsync(async (req: NextRequest, { params }: any) => {
  const { id } = await params;

  const doctor = await doctorServices.getDoctorById(id);

  return sendResponse({
    statusCode: status.OK,
    success: true,
    message: "Doctor fetched",
    data: doctor,
  });
});

export const PATCH = catchAsync(async (req: NextRequest, { params }: any) => {
  const { id } = await params;

  const body = await req.json();
  await updateDoctorValidation.parseAsync({ body });

  const doctor = await doctorServices.updateDoctor(id, body);

  return sendResponse({
    statusCode: status.OK,
    success: true,
    message: "Doctor updated",
    data: doctor,
  });
});

export const DELETE = catchAsync(async (req: NextRequest, { params }: any) => {
  const { id } = await params;

  await doctorServices.deleteDoctor(id);

  return sendResponse({
    statusCode: status.OK,
    success: true,
    message: "Doctor deleted",
    data: null,
  });
});
