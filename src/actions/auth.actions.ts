'use server'
import { UserCreateInput } from "@/types/auth.types";
import AuthService from "@/services/auth.services";

export async function registerUserAction(data: UserCreateInput) {
        const result = await AuthService.register(data);
        return result
    
}