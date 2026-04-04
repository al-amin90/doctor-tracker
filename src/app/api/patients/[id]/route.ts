import auth from "@/lib/middlewares/auth";
import catchAsync, { handleError } from "@/lib/utils/catchAsync";
import sendResponse from "@/lib/utils/sendResponse";
import { doctorServices } from "@/modules/doctor/doctor.service";
import { createDoctorValidation } from "@/modules/doctor/doctor.validation";
import { patientServices } from "@/modules/patient/patient.service";
import {
  createPatientValidation,
  updatePatientValidation,
} from "@/modules/patient/patient.validation";
import status from "http-status";
import { NextRequest } from "next/server";

export const PATCH = catchAsync(
  auth("admin")(async (req: NextRequest, { params }: any) => {
    const { id } = await params;
    const body = await req.json();

    await updatePatientValidation.parseAsync({ body });
    const patient = await patientServices.updatePatient(id, body);

    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: "Patient updated",
      data: patient,
    });
  }),
);

export const DELETE = catchAsync(
  auth("admin")(async (req: NextRequest, { params }: any) => {
    const { id } = await params;

    await patientServices.deletePatient(id);

    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: "Patient deleted",
      data: null,
    });
  }),
);
