import mongoose, { model, Schema } from "mongoose";
import { IDoctor } from "./doctor.interface";

const DoctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, index: true },
    specialization: { type: String, index: true },
    hospital: { type: String, index: true },
    phone: { type: String },
    email: {
      type: String,
      unique: true,
      index: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const DoctorModel =
  mongoose.models.Doctor || model<IDoctor>("Doctor", DoctorSchema);

export default DoctorModel;
