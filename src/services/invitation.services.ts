
import { TOwnInvitations, TResponseInvitation } from "@/types/invitation.types";
import { ApiErrorResponse } from "@/types/response.type";
import { cookies } from "next/headers";
import { ServiceOptionds } from "./event.services";
import { revalidateTag } from "next/cache";
import { IBaseEvent } from "@/types/event.types";
import { IBaseUser } from "@/types/user.types";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined. Please set NEXT_PUBLIC_API_BASE_URL in your environment variables.");
}

const InvitationService = {
  inviteToEvent: async ({
    eventId,
    inviteeId,
    message,
  }: {
    eventId: string;
    inviteeId: string[];
    message?: string;
  }) => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${API_BASE_URL}/invitation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ eventId,inviteeId, message }),
      });
      revalidateTag("invitation",'max')
      const body = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: body?.message || "Failed to send invitation",
        };
      }
      return {
        success: true,
        message: body.message || "Invitation sent successfully.",
        data: body.data,
      };
    } catch (error: any) {
      return { success: false, message: error.message || "Server error" };
    }
  },

  GetuserownInvitations: async (params?: any, options?: ServiceOptionds) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_BASE_URL}/invitation/user`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }
      const config: RequestInit = {};
      config.headers = {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      };
      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ["invitation","invitations"] };

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data?.message || "Failed to fetch invitations",
        };
      }
      return {
        success: true,
        message: data?.message || "Invitations fetched successfully.",
        data: data?.data as TOwnInvitations<TResponseInvitation<{event:IBaseEvent,invitee:IBaseUser}>>,
      };
    } catch (error: any) {
      return { success: false, message: error.message || "Server error" };
    }
  },
};

export default InvitationService;
