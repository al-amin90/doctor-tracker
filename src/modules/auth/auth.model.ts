import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, IUserModel } from "./auth.interface";

const userSchema = new Schema<IUser, IUserModel>(
  {
    name: { type: String },
    email: {
      type: String,
      unique: true,
      trim: true,
      index: true,
    },
    password: { type: String, select: false },
    role: { type: String, enum: ["admin", "user"], default: "admin" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    statics: {
      async isPasswordMatch(planTextPassword, hashTextPassword) {
        return await bcrypt.compare(planTextPassword, hashTextPassword);
      },
    },
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.BCRYPT_SALT_ROUNDS || "12"),
  );
});

userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

userSchema.pre("find", function () {
  this.find({ isDeleted: { $ne: true } });
});

userSchema.pre("findOne", function () {
  this.find({ isDeleted: { $ne: true } });
});

userSchema.pre("aggregate", function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

const UserModel =
  (mongoose.models.User as IUserModel) ||
  mongoose.model<IUser, IUserModel>("User", userSchema);

export default UserModel;
