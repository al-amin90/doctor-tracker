import AppError from "@/lib/errors/AppError";
import config from "@/config";
import { createToken } from "./auth.utils";
import UserModel from "./auth.model";
import dbConnect from "@/lib/db/mongodb";
import { ILoginPayload, IRegisterPayload } from "./auth.interface";
import status from "http-status";

export const register = async (payload: IRegisterPayload) => {
  await dbConnect();

  const exists = await UserModel.findOne({ email: payload.email });
  if (exists) throw new AppError(status.CONFLICT, "Email already registered");

  const user = await UserModel.create(payload);
  return user;
};

export const login = async (payload: ILoginPayload) => {
  await dbConnect();
  const user = await UserModel.findOne({ email: payload.email }).select(
    "+password",
  );
  if (!user) throw new AppError(status.NOT_FOUND, "User not found");
  if (user.isDeleted) throw new AppError(status.FORBIDDEN, "User is deleted");

  const isMatch = await UserModel.isPasswordMatch(
    payload.password,
    user.password,
  );
  if (!isMatch) throw new AppError(status.UNAUTHORIZED, "Invalid credentials");

  const tokenPayload = { id: user._id, email: user.email, role: user.role };

  const accessToken = createToken(
    tokenPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    tokenPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const authServices = {
  register,
  login,
};
