import catchAsync, { handleError } from "@/lib/utils/catchAsync";
import sendResponse from "@/lib/utils/sendResponse";
import { doctorServices } from "@/modules/doctor/doctor.service";
import { createDoctorValidation } from "@/modules/doctor/doctor.validation";
import status from "http-status";
import { NextRequest } from "next/server";

export const GET = catchAsync(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const query: Record<string, unknown> = {};

  searchParams.forEach((v, k) => {
    query[k] = v;
  });

  const { data, meta } = await doctorServices.getAllDoctors(query);

  return sendResponse({
    statusCode: status.OK,
    success: true,
    message: "Doctors fetched",
    meta,
    data,
  });
});

export const POST = catchAsync(async (req: NextRequest) => {
  const body = await req.json();

  await createDoctorValidation.parseAsync({ body });
  const doctor = await doctorServices.createDoctor(body);

  return sendResponse({
    statusCode: status.CREATED,
    success: true,
    message: "Doctor created",
    data: doctor,
  });
});
