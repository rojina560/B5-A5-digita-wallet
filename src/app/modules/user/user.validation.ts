import z from 'zod'
import { IsActive, Role } from './user.interfaces'

// Crate user zod schema
export const createUserZodSchema = z.object({
    name: z.string()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .max(50, { message: 'Name can not be more that 50 characters.' }),

    email: z.string()
        .email({ message: 'Email is invalid.' }),

    password: z.string().
        min(8, { message: 'Password minimum length is 8.' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, { message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, one special character and one number.' }),

    phone: z.string()
        .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, { message: 'Invalid Phone Number.' }),

    address: z.string()
        .max(200, { message: 'Address can not exced 200 characters.' })
        .optional()
})


// Update user zod schema
export const updateUserZodSchema = z.object({
    name: z.string()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .max(50, { message: 'Name can not be more that 50 characters.' })
        .optional(),

    password: z.string().
        min(8, { message: 'Password minimum length is 8.' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, { message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, one special character and one number.' })
        .optional(),

    address: z.string()
        .max(200, { message: 'Address can not exced 200 characters.' })
        .optional(),

    role: z.enum(Object.values(Role) as [string])
        .optional(),


    isActive: z.enum(Object.values(IsActive) as [string])
        .optional(),

    isDeleted: z.boolean()
        .optional(),

    isVerified: z.boolean()
        .optional()
})