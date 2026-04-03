import { z } from "zod";

export const createPatientValidation = z.object({
  body: z.object({
    name: z.string().min(2, "Name required"),
    age: z.number().min(0, "Valid age required"),
    gender: z.enum(["male", "female", "other"]),
    condition: z.string().min(2, "Condition required"),
    phone: z.string().min(7, "Valid phone required"),
    email: z.string().email("Valid email required"),
    doctorId: z.string().min(1, "Doctor ID required"),
  }),
});

export const updatePatientValidation = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    age: z.number().min(0).optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    condition: z.string().min(2).optional(),
    phone: z.string().min(7).optional(),
    email: z.string().email().optional(),
    doctorId: z.string().optional(),
  }),
});
