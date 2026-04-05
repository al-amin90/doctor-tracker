/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from "jsonwebtoken";
import { Model } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export interface IAuthRequest extends NextRequest {
  user: JwtPayload;
}

export type Handler = (
  req: NextRequest,
  context?: { params: Promise<any> },
) => Promise<NextResponse>;

export type ILoginPayload = {
  email: string;
  password: string;
};

export type IRegisterPayload = {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "user";
};

export type IUser = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isDeleted: boolean;
};

export interface IUserModel extends Model<IUser> {
  isUserExistById(id: string): Promise<IUser> | null;
  isPasswordMatch(
    planTextPassword: string,
    hashTextPassword: string,
  ): Promise<IUser> | null;
}
