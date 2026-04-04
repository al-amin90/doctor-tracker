import { z } from 'zod'

export const loginValidation = z.object({
  body: z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
})

export const registerValidation = z.object({
  body: z.object({
    name: z.string().min(2, 'Name required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password min 6 chars'),
    role: z.enum(['admin', 'user']),
  }),
})