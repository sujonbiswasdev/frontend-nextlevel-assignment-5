import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { ServiceOptionds } from "./event.services";
import { ApiResponse } from "@/types/response.type";
import { TResponseParticipant } from "@/types/participant.types";
import { IBaseUser } from "@/types/user.types";
import { IBaseEvent } from "@/types/event.types";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error(
    "API_BASE_URL is not defined. Please check your environment variables.",
  );
}

const ParticipantService = {
  participantCreate: async (id: string) => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${API_BASE_URL}/participant/event/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      revalidateTag("participant", "max");
      const data = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: data?.message || "Failed to create participant",
        };
      }
      return {
        success: true,
        message: data?.message || "Participant created successfully",
        data: data?.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }
  },
  participantRetrieve: async (params?: any, options?: ServiceOptionds) => {
    try {
        const cookieStore = await cookies();
      const url = new URL(`${API_BASE_URL}/participants`);
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
      config.next = { ...config.next, tags: ["participant"] };
      const res = await fetch(url.toString(),
       {
        ...config,
        credentials:"include",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
        

       });
      const data = await res.json() as ApiResponse<TResponseParticipant<{user:IBaseUser[],event:IBaseEvent[]}>[]>;
      if (!res.ok) {
        return {
          success: false,
          message: data?.message || "Failed to retrieve participants",
        };
      }
      return {
        success: true,
        message: data?.message || "Participants retrieved successfully",
        data: data?.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }
  },
};

export default ParticipantService;
