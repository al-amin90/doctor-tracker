import dbConnect from "@/lib/db/mongodb";
import { IDoctor } from "./doctor.interface";
import QueryBuilder from "@/lib/builder/QueryBuilder";
import AppError from "@/lib/errors/AppError";
import status from "http-status";
import DoctorModel from "./doctor.model";

const createDoctor = async (payload: Partial<IDoctor>) => {
  await dbConnect();

  const result = await DoctorModel.create(payload);
  return result;
};

const getAllDoctors = async (query: Record<string, unknown>) => {
  await dbConnect();

  const searchFields = ["name", "specialization", "hospital", "email"];

  const builder = new QueryBuilder(DoctorModel.find(), query)
    .search(searchFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const [data, meta] = await Promise.all([
    builder.modelQuery.lean(),
    builder.countTotal(),
  ]);
  return { data, meta };
};

const getDoctorById = async (id: string) => {
  await dbConnect();
  const doctor = await DoctorModel.findById(id);

  if (!doctor) throw new AppError(status.NOT_FOUND, "Doctor not found");

  return doctor;
};

const updateDoctor = async (id: string, payload: Partial<IDoctor>) => {
  await dbConnect();

  const doctor = await DoctorModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!doctor) throw new AppError(status.NOT_FOUND, "Doctor not found");

  return doctor;
};

const deleteDoctor = async (id: string) => {
  await dbConnect();
  const doctor = await DoctorModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!doctor) throw new AppError(status.NOT_FOUND, "Doctor not found");
  return doctor;
};

export const doctorServices = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
