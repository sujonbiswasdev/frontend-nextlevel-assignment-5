import { revalidateTag } from 'next/cache';
import { cookies } from "next/headers"
import { ApiErrorResponse, ApiResponse } from '@/types/response.type';
import { IBaseUser, TUpdateUserInput } from '@/types/user.types';
import { TPagination } from '@/types/event.types';

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
getAllUsers: async (params?: any, options?: { cache?: RequestCache; revalidate?: number }) => {
  try {
    const cookieStore = await cookies();
    const url = new URL(`${API_BASE_URL}/admin/users`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, String(value));
        }
      });
    }
    const config: RequestInit = {};
    if (options?.cache) {
      config.cache = options.cache;
    }
    if (options?.revalidate) {
      config.next = { revalidate: options.revalidate };
    }
    config.next = { ...config.next, tags: ["users", "user"] };
    const res = await fetch(url.toString(), { 
      ...config, 
      credentials: "include", 
      headers: { 
        "Content-Type": "application/json",
        Cookie: cookieStore.toString()
      } 
    });
    const data = await res.json();
    console.log(data,'datas')
    if (!res.ok) {
      const error = data as ApiErrorResponse;
      return { success: false, message: error.message || "Failed to retrieve users" };
    }
    // Assume API returns { success, message, data } where data is an array of IBaseUser
    return {
      success: data.success,
      message: data.message || "Users retrieved successfully",
      users: data.data.data as IBaseUser[],
      pagination:data.data.pagination as TPagination,
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred while fetching users" };
  }
},



}