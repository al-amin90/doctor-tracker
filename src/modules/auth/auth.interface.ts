import { Model } from "mongoose";

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
  isUserExistById(id: string): Promise<IUser> | null
  isPasswordMatch(
    planTextPassword: string,
    hashTextPassword: string,
  ): Promise<IUser> | null

}
