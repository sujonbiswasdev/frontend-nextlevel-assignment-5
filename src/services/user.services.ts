import { revalidateTag } from 'next/cache';
import { cookies } from "next/headers"
import { ApiErrorResponse, ApiResponse } from '@/types/response.type';
import { IBaseUser, TUpdateUserInput } from '@/types/user.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined. Please set NEXT_PUBLIC_API_BASE_URL in your environment variables.");
}

export const userService={
    updateUser:async(updateUser:TUpdateUserInput)=>{  
  try {
    const cookieStore = await cookies()
    const res = await fetch(`${API_BASE_URL}/profile/update`, {
      method: "PUT",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(updateUser),
    });
    revalidateTag("user",'max')
    const data= await res.json();
    const result =data as ApiResponse<IBaseUser> 
    if (!res.ok) {
      const error=data as ApiErrorResponse
       return { message: error.message || "An error occurred while updating" }
    }
    return { success: true, message: "user updated successfully", result };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message || "An error occurred while updating" };
  }
    },
deleteUserOwn: async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_BASE_URL}/profile/own/delete`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });
    revalidateTag("user", "max");
    const data = await res.json();
    if (!res.ok) {
      const error = data as ApiErrorResponse;
      return { error: true, message: error.message || "An error occurred while deleting user" };
    }
    return { success: true, result: data, message: data?.message || "User deleted successfully" };
  } catch (error: any) {
    console.error(error);
    return { error: true, message: error.message || "An error occurred while deleting user" };
  }
},


}