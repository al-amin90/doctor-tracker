import auth from "@/lib/middlewares/auth";
import catchAsync, { handleError } from "@/lib/utils/catchAsync";
import sendResponse from "@/lib/utils/sendResponse";
import { doctorServices } from "@/modules/doctor/doctor.service";
import { createDoctorValidation } from "@/modules/doctor/doctor.validation";
import { patientServices } from "@/modules/patient/patient.service";
import { createPatientValidation } from "@/modules/patient/patient.validation";
import status from "http-status";
import { NextRequest } from "next/server";

export const GET = catchAsync(
  auth(
    "admin",
    "user",
  )(async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);

    const query: Record<string, unknown> = {};
    searchParams.forEach((v, k) => {
      query[k] = v;
    });

    const { data, meta } = await patientServices.getAllPatients(query);

    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: "Patients fetched",
      meta,
      data,
    });
  }),
);

export const POST = catchAsync(
  auth("admin")(async (req: NextRequest) => {
    const body = await req.json();
    await createPatientValidation.parseAsync({ body });

    const patient = await patientServices.createPatient(body);

    return sendResponse({
      statusCode: status.CREATED,
      success: true,
      message: "Patient created",
      data: patient,
    });
  }),
);
