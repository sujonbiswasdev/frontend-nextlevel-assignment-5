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

export async function verifyEmailAction(data: { email: string; otp: string }) {
    const result = await AuthService.verifyEmail(data);
    return result;
}

export async function resendVerificationCodeAction(data: { email: string }) {
    const result = await AuthService.resendVerificationCode(data);
    return result;
}

export async function forgotPasswordEmailOtpAction(data: { email: string }) {
    const result = await AuthService.ForgotPasswordEmailOTP(data);
    return result;
}

export async function resetPasswordAction(data: { email: string; otp: string; newPassword: string }) {
    const result = await AuthService.ResetPassword(data);
    return result;
}