
import { TPagination } from "@/types/event.types";
import { ApiErrorResponse, ApiResponse } from "@/types/response.type";
import { ICreatereviewData, TResponseReviewData } from "@/types/review.types";
import { cookies } from "next/headers";
import { ServiceOptionds } from "./event.services";

export interface IModerateData {
  status:string;
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined. Please set NEXT_PUBLIC_API_BASE_URL in your environment variables.");
}

export const reviewService = {
  createReview: async (eventid: string, data: ICreatereviewData) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_BASE_URL}/event/${eventid}/review`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
        next:{
            tags:['review']
        }
      });
      const body = await res.json();
      const result = body as ApiResponse<TResponseReviewData>;
      if (!res.ok) {
        const error = body as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "review create failed",
        };
      }

      return result;
    } catch (e: any) {
      return { success: false, message: e.message, error: "Server error" };
    }
  },
  getMyReview: async (params?: any, options?: ServiceOptionds) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_BASE_URL}/my-reviews`);
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
      config.next = { ...config.next, tags: ["review","reviews"] };

      config.headers = {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      };
      config.credentials = "include";

      const res = await fetch(url.toString(), config);
      const data = await res.json();
      console.log(data,'gdsdf')
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "Failed to get your review",
        };
      }
      return {
        success: data.success,
        message: data.message || "Retrieved all your reviews successfully",
        data: data.data.data as TResponseReviewData[],
        pagination: data.data.pagination as TPagination,
      };
    } catch (e: any) {
      return { message: "something went wrong please try again" };
    }
  },
  deleteReview: async (reviewid: string, options?: ServiceOptionds) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_BASE_URL}/review/${reviewid}`);

      const config: RequestInit = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
      };

      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ["review", "reviews"] };

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "Failed to delete review",
        };
      }

      return {
        success: data.success,
        message: data.message || "Review deleted successfully",
        data: data.data,
      };
    } catch (e: any) {
      return {
        success: false,
        message: e.message || "Server error",
        error: "Server error"
      };
    }
  },
  
}