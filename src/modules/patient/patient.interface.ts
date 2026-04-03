import { Types } from "mongoose";
import { IDoctor } from "../doctor/doctor.interface";

export type IPatient = {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  condition: string;
  phone: string;
  email: string;
  doctorId: Types.ObjectId;
  doctor?: IDoctor;
  isDeleted: boolean;
};
