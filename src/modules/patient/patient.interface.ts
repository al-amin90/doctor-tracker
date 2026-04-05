import { Types } from "mongoose";
import { IDoctor } from "../doctor/doctor.interface";

export type IPatient = {
  _id: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  condition: string;
  phone: string;
  email: string;
  doctorId: any;
  doctor?: IDoctor;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
};
