import { setTokenInCookies } from "@/lib/tokenutils";
import { UserCreateInput, UserCreateInputWithTokens, UserLoginInputType } from "@/types/auth.types";
import { ApiErrorResponse, ApiResponse } from "@/types/response.type";
import { cookies } from "next/headers";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log(API_BASE_URL,'API_BASE_URL')
const AuthService = {
    register: async (value: UserCreateInput) => {
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
    },
    loginUser:async(logindata: UserLoginInputType)=>{
        try {
          const storeCookies = await cookies();
          const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Cookie: storeCookies.toString(),
            },
            cache: "no-store",
            body: JSON.stringify(logindata),
          });
          const body = await response.json();
          const result = body as ApiResponse<UserCreateInputWithTokens>
          
          if (!response.ok) {
            const error = body as ApiErrorResponse;
            return { success:error.success, message: error.message };
          }
      
          const { accessToken, refreshToken: newRefreshToken, token } = result.data;
      
          if (accessToken) {
            await setTokenInCookies("accessToken", accessToken);
          }
      
          if (newRefreshToken) {
            await setTokenInCookies("refreshToken", newRefreshToken);
          }
      
          if (token) {
            await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60); // 1 day in seconds
          }
          return {
            success: true,
            message: `${result.message ||"Login successful. Welcome back!"}`,
            data: result.data
          };
        } catch (error:any) {
          return { success:false, message:error.message|| "server error" };
        }
    },
    verifyEmail: async (verifyData: { email: string; otp: string }) => {
        try {
            const storeCookies = await cookies();
            const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: storeCookies.toString(),
                },
                cache: "no-store",
                body: JSON.stringify(verifyData),
            });
            const body = await response.json();
            const result = body as ApiResponse<any>;

            if (!response.ok) {
                const error = body as ApiErrorResponse;
                return { success: error.success, message: error.message };
            }

            return {
                success: true,
                message: result.message || "Email successfully verified!",
                data: result.data,
            };
        } catch (error: any) {
            return { success: false, message: error.message || "Server error" };
        }
    },
    resendVerificationCode: async ({ email }: { email: string }) => {
        try {
            const storeCookies = await cookies();
            const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: storeCookies.toString(),
                },
                cache: "no-store",
                body: JSON.stringify({ email, type: "email-verification" }),
            });
            const body = await response.json();
            const result = body as ApiResponse<any>;
            if (!response.ok) {
                const error = body as ApiErrorResponse;
                return { success: error.success, message: error.message };
            }
            return {
                success: true,
                message: result.message || "Verification code resent successfully!",
                data: result.data,
            };
        } catch (error: any) {
            return { success: false, message: error.message || "Server error" };
        }
    },
    ForgotPasswordEmailOTP: async ({ email }: { email: string }) => {
        try {
            const storeCookies = await cookies();
            const response = await fetch(`${API_BASE_URL}/auth/forget-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: storeCookies.toString(),
                },
                cache: "no-store",
                body: JSON.stringify({ email }),
            });
            const body = await response.json();
            const result = body as ApiResponse<any>;
            if (!response.ok) {
                const error = body as ApiErrorResponse;
                return { success: error.success, message: error.message,url:"/login" };
            }
            return {
                success: true,
                message: result.message || "Password reset OTP sent successfully!",
                data: result.data,
            };
        } catch (error: any) {
            return { success: false, message: error.message || "Server error" };
        }
    },
    ResetPassword: async ({
        email,
        otp,
        newPassword,
    }: {
        email: string;
        otp: string;
        newPassword: string;
    }) => {
        try {
            const storeCookies = await cookies();
            const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: storeCookies.toString(),
                },
                cache: "no-store",
                body: JSON.stringify({
                    email,
                    otp,
                    newPassword,
                }),
            });
            const body = await response.json();
            const result = body as ApiResponse<any>;
            if (!response.ok) {
                const error = body as ApiErrorResponse;
                return {
                    success: error.success,
                    message: error.message,
                    url: "/login",
                };
            }
            return {
                success: true,
                message: result.message || "Password reset successfully!",
                data: result.data,
            };
        } catch (error: any) {
            return { success: false, message: error.message || "Server error" };
        }
    },
    getSession: async () => {
        try {
            const storeCookies = await cookies();
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                headers: {
                    "Content-Type": "application/json",
                    Cookie: storeCookies.toString(),
                },
                cache:"no-store"
               
            });
            const body = await response.json();
            console.log(body)
            const result = body as ApiResponse<any>;
            if (!response.ok) {
                const error = body as ApiErrorResponse;
                return {
                    success: error.success,
                    message: error.message,
                };
            }

            const { accessToken, refreshToken: newRefreshToken, token } = result.data;
      
            if (accessToken) {
              await setTokenInCookies("accessToken", accessToken);
            }
        
            if (newRefreshToken) {
              await setTokenInCookies("refreshToken", newRefreshToken);
            }
        
            if (token) {
              await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60); // 1 day in seconds
            }
            return {
              success: true,
              message: "User account retrieve successfully!",
              data: result.data
            };
         
        } catch (error: any) {
            return { success: false, message: error.message || "Server error" };
        }
    },

      
};

export default AuthService;