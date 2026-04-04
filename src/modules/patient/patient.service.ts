import QueryBuilder from "@/lib/builder/QueryBuilder";
import AppError from "@/lib/errors/AppError";
import PatientModel from "./patient.model";
import { IPatient } from "./patient.interface";
import dbConnect from "@/lib/db/mongodb";
import { searchableFields } from "./patient.constant";

const createPatient = async (payload: Partial<IPatient>) => {
  await dbConnect();

  return PatientModel.create(payload);
};

const getAllPatients = async (query: Record<string, unknown>) => {
  await dbConnect();

  const searchFields = ["name", "condition", "email"];

  const builder = new QueryBuilder(
    PatientModel.find().populate("doctorId", "name specialization hospital"),
    query,
  )
    .search(searchFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const [data, meta] = await Promise.all([
    builder.modelQuery,
    builder.countTotal(),
  ]);
  return { data, meta };
};

const getPatientsByDoctor = async (
  doctorId: string,
  query: Record<string, unknown>,
) => {
  await dbConnect();
  const builder = new QueryBuilder(
    PatientModel.find({ doctorId }).populate("doctorId", "name specialization"),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate();

  const [data, meta] = await Promise.all([
    builder.modelQuery,
    builder.countTotal(),
  ]);
  return { data, meta };
};

const updatePatient = async (id: string, payload: Partial<IPatient>) => {
  await dbConnect();
  const patient = await PatientModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!patient) throw new AppError(404, "Patient not found");
  return patient;
};

const deletePatient = async (id: string) => {
  await dbConnect();
  const patient = await PatientModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!patient) throw new AppError(404, "Patient not found");
  return patient;
};

export const patientServices = {
  createPatient,
  getAllPatients,
  getPatientsByDoctor,
  updatePatient,
  deletePatient,
};
