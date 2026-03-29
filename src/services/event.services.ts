import {  ICreateEvent, TEventsGroupedResponse, TResponseEvent } from "@/types/event.types";
import { ApiErrorResponse, ApiResponse } from "@/types/response.type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
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

      const result = data as TEventsGroupedResponse<{reviews:any[],organizer:{image:string,name:string,email:string}}>;
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
  createEvent: async (value: ICreateEvent) => {
    const storeCookies = await cookies();
    
    try {
      const response = await fetch(`${API_BASE_URL}/event`, {
        credentials:"include",
        method: "POST",
        headers: { "Content-Type": "application/json" ,Cookie: storeCookies.toString()},
        body: JSON.stringify(value),
      });
      revalidateTag("events",'max')
      const body = await response.json();
      const result = body as ApiResponse<TResponseEvent>;
      if (!response.ok) {
        const error = body as ApiErrorResponse;
        return {
          success: false,
          message: error.message,
        };
      }
      return {
        success: true,
        message: result.message || "Event created successfully",
        data: result.data,
      };
    } catch (error) {
      return { success: false, message: "Something went wrong. Please try again." };
    }
  },
  getPaidAndFreeEvent: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/events/paidandfree`, {
        credentials: "include",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: false,
          message: error.message || "Failed to fetch Paid & Free Events",
        };
      }
      return {
        success: data.success,
        message: data.message || "Fetched Paid & Free Events successfully",
        data: data.data,
      };
    } catch (error) {
      return { success: false, message: "Something went wrong. Please try again." };
    }
  },
  getSingleEventByType: async (eventId: string) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/event/${eventId}`,
        {
          credentials: "include",
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      const result =data as ApiResponse<TResponseEvent<{reviews:any[]}>>
      console.log(data,'data')
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: false,
          message: error.message || "Failed to fetch event details",
        };
      }
      return {
        success: result.success,
        message: result.message || "Fetched event successfully",
        data: result.data,
      };
    } catch (error) {
      return { success: false, message: "Something went wrong. Please try again." };
    }
  },
};

export default EventService;
