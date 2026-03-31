import { updateUserSchema } from "@/validations/user.validation";
import z from "zod";

export interface IBaseUser {
    id: string;
    name: string;
    email: string;
    phone:string;
    isActive:boolean;
    bgimage:string;
    role: 'USER' | 'ADMIN';
    status: 'ACTIVE' | 'BLOCKED' | 'DELETED';
    image: string | null;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    totalReview: number;
    averageRating: number;
}



export type TResponseUserData<T = unknown> = IBaseUser & T;

export type TUpdateUserInput = z.infer<typeof updateUserSchema>;