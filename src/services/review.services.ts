
import { ApiErrorResponse, ApiResponse } from "@/types/response.type";
import { ICreatereviewData, TResponseReviewData } from "@/types/review.types";
import { cookies } from "next/headers";

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
  getMyReview: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE_URL}/my-reviews`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        }
      });

      const body = await res.json();
      const result = body as ApiResponse<TResponseReviewData[]>;
      console.log(result,'result')
      if (!res.ok) {
        const error = body as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "Failed to get your review",
        };
      }

      // Return success message and data
      return {
        success: result,
        message: result.message,
        data: result.data
      };
    } catch (e: any) {
      return { success: false, message: e.message, error: "Server error" };
    }
  },
}