'use server'
import { UserCreateInput } from "@/types/auth.types";
import AuthService from "@/services/auth.services";
import { UserLoginInputType } from "@/types/auth.types";

export async function registerUserAction(data: UserCreateInput) {
        const result = await AuthService.register(data);
        return result
    
}

export async function loginUserAction(data: UserLoginInputType) {
    const result = await AuthService.loginUser(data);
    return result;
}