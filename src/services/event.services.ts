import { TEventsGroupedResponse, TResponseEvent } from "@/types/event.types";
import { ApiErrorResponse, ApiResponse } from "@/types/response.type";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ServiceOptionds {
    cache?: RequestCache;
    revalidate?: number;
  }

const EventService = {
  getEvents: async (params?: any, options?: ServiceOptionds) => {
    try {
      const url = new URL(`${API_BASE_URL}/events`);
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
      config.next = { ...config.next, tags: ["events"] };

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      const result = data as TEventsGroupedResponse<{reviews:any[]}>;
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "retrieve all events failed",
        };
      }
      return {
        success: result.success,
        message: result.message || "retrieve all events successfully",
        data: result.data.data,
        pagination:data.data.pagination
      };
    } catch (error) {
      return { message: "something went wrong please try again" };
    }
  },
};

export default EventService;
