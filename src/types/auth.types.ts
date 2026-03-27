
import { createUserSchema } from "@/validations/auth.validation";
import z from "zod";

export type UserCreateInput = z.infer<typeof createUserSchema>;

export type UserCreateInputWithTokens = UserCreateInput & {
    accessToken?: string;
    refreshToken?: string;
    token:string;
  };