import { IDoctor } from "@/modules/doctor/doctor.interface";

export type TPatient = {
  _id: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  condition: string;
  phone: string;
  email: string;
  doctorId: string;
  doctor?: IDoctor;
  createdAt: string;
  updatedAt: string;
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TApiResponse<T> = {
  success: boolean;
  message: string;
  meta?: TMeta;
  data: T;
};

export type TDashboardStats = {
  totalDoctors: number;
  totalPatients: number;
  patientsPerDoctor: { doctorName: string; count: number }[];
  dailyRegistrations: { date: string; doctors: number; patients: number }[];
  conditionBreakdown: { condition: string; count: number }[];
  recentDoctors: IDoctor[];
  recentPatients: TPatient[];
};
