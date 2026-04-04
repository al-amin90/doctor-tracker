import { IDoctor } from "@/modules/doctor/doctor.interface";
import { TPatient } from "@/modules/patient/patient.interface";

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
