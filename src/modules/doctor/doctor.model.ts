import mongoose, { model, Schema } from "mongoose";
import { IDoctor } from "./doctor.interface";

const doctorSchema = new Schema<IDoctor>(
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

doctorSchema.pre("find", function () {
  this.find({ isDeleted: { $ne: true } });
});

doctorSchema.pre("findOne", function () {
  this.find({ isDeleted: { $ne: true } });
});

doctorSchema.pre("aggregate", function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

const DoctorModel =
  mongoose.models.Doctor || model<IDoctor>("Doctor", doctorSchema);

export default DoctorModel;
