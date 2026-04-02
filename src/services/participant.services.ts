import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { ServiceOptionds } from "./event.services";
import { ApiErrorResponse, ApiResponse } from "@/types/response.type";
import { TResponseParticipant } from "@/types/participant.types";
import { IBaseUser } from "@/types/user.types";
import { IBaseEvent, TPagination } from "@/types/event.types";
import { UpdateParticipantInput } from "@/validations/participant.validation";
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
      console.log(data,'dskfjddfsfs')
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
      const data = await res.json() ;
      console.log(data,'data')
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "retrieve all events failed",
        };
      }
      return {
        success: true,
        message: data?.message || "Participants retrieved successfully",
        data: data?.data.result || data.data.participants as TResponseParticipant<{user:IBaseUser[],event:IBaseEvent[]}>[],
        pagination:data.data.pagination as TPagination

      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }
  },
  getParticipantsByEvent: async (params?: any, options?: ServiceOptionds) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_BASE_URL}/participant/request/event`);
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

      const res = await fetch(url.toString(), {
        ...config,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });

      const data = await res.json();
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "retrieve participants by event failed",
        };
      }
      return {
        success: true,
        message: data?.message || "Participants by event retrieved successfully",
        data: data?.data as TResponseParticipant<{event: IBaseEvent ,user:IBaseUser}>[],
        pagination: data.data.pagination as TPagination,
      };
    } catch (error) {
      return { 
        success: false,
        message: "Something went wrong please try again",
      };
    }
  },
  participantUpdate: async (id: string, payload: UpdateParticipantInput) => {
    try {
      const cookieStore = await cookies(); // if using Next.js server cookies
      const res = await fetch(`${API_BASE_URL}/participant/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore?.toString() || "",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const result = data as ApiResponse<TResponseParticipant<{user: IBaseUser[], event: IBaseEvent[]}>[]>;
      revalidateTag("participant", "max");

      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "Update failed",
        };
      }

      return {
        success: result?.success,
        message: result?.message || "Updated successfully",
        data: result?.data,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || "Something went wrong",
      };
    }
  },
  participantDelete: async (id: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_BASE_URL}/participant/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      revalidateTag("participant",'max');

      const data = await res.json();
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "Delete failed",
        };
      }

      return {
        success: data.success,
        message: data.message || "Deleted successfully",
      };

    } catch {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  },
  getOwnPayment: async (id:string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE_URL}/participant/event/${id}/own-payment`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        const error = await res.json();
        return {
          success: false,
          message: error.message || "Failed to fetch payment information",
        };
      }

      const data = await res.json();
      return {
        success: true,
        data: data.data,
        message: data.message || "Fetched payment information successfully",
      };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || "Something went wrong while fetching payment info",
      };
    }
  },
  deleteEventRequiestJoinData: async (id: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE_URL}/participant/request/event/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Failed to delete event request",
        };
      }

      return {
        success: data.success,
        message: data.message || "Event request deleted successfully",
      };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || "Something went wrong while deleting event request",
      };
    }
  },

};

export default ParticipantService;
