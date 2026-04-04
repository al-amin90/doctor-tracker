import mongoose, { model, Schema } from "mongoose";
import { IPatient } from "./patient.interface";

const patientSchema = new Schema<IPatient>(
  {
    name: { type: String, index: true },
    age: { type: Number, min: 0 },
    gender: { type: String, enum: ["male", "female", "other"] },
    condition: { type: String, index: true },
    phone: { type: String, trim: true },
    email: {
      type: String,
      index: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      index: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

patientSchema.pre("find", function () {
  this.find({ isDeleted: { $ne: true } });
});

patientSchema.pre("findOne", function () {
  this.find({ isDeleted: { $ne: true } });
});

patientSchema.pre("aggregate", function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

const PatientModel =
  mongoose.models.Patient || model<IPatient>("Patient", patientSchema);

export default PatientModel;
