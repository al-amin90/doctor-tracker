import mongoose, { model, Schema } from "mongoose";
import { IPatient } from "./patient.interface";

const PatientSchema = new Schema<IPatient>(
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

PatientSchema.pre("find", function () {
  this.find({ isDeleted: { $ne: true } });
});

PatientSchema.pre("findOne", function () {
  this.find({ isDeleted: { $ne: true } });
});

PatientSchema.pre("aggregate", function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

const PatientModel =
  mongoose.models.Patient || model<IPatient>("Patient", PatientSchema);

export default PatientModel;
