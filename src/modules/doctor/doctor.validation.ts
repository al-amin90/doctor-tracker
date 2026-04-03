import { z } from "zod";

export const createDoctorValidation = z.object({
  body: z.object({
    name: z.string().min(2, "Name required"),
    specialization: z.string().min(2, "Specialization required"),
    hospital: z.string().min(2, "Hospital required"),
    phone: z.string().min(7, "Valid phone required"),
    email: z.string().email("Valid email required"),
  }),
});

export const updateDoctorValidation = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    specialization: z.string().min(2).optional(),
    hospital: z.string().min(2).optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
  }),
});
