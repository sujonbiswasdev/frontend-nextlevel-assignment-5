import { setTokenInCookies } from "@/lib/tokenutils";
import { UserCreateInput, UserCreateInputWithTokens } from "@/types/auth.types";
import { ApiErrorResponse, ApiResponse } from "@/types/response.type";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log(API_BASE_URL,'API_BASE_URL')
const AuthService = {
    register: async (value: UserCreateInput) => {
        console.log(value, 'validu');
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(value)
        });
        const body = await response.json();
        const result = body as ApiResponse<UserCreateInputWithTokens>
        if (!response.ok) {
            const error = body as ApiErrorResponse;
            return { success: false, message: error.message };
        }
        // Destructure the result to retrieve all tokens
        const { accessToken, refreshToken: newRefreshToken,token  } = result.data;
        if (accessToken) {
            await setTokenInCookies("accessToken", accessToken);
          }
      
          if (newRefreshToken) {
            await setTokenInCookies("refreshToken", newRefreshToken);
          }
          if (token) {
            await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);
          }
        const verifyEmailMessage = "Please check your email to verify your account.";
        return {
            success: true,
            message: `${result.message ? result.message + " - " : ""}${verifyEmailMessage}`,
            data: result.data
        };
    }
};

export default AuthService;