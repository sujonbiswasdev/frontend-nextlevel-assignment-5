import { IBaseEvent } from '@/types/event.types';
import { TNotification } from '@/types/notification.type';
import { ApiResponse } from '@/types/response.type';
import { IBaseUser } from '@/types/user.types';

import { cookies } from "next/headers";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined. Please set NEXT_PUBLIC_API_BASE_URL in your environment variables.");
}

export const NotificationService = {
  getUserNotifications: async () => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${API_BASE_URL}/notifications`, {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const body = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: body?.message || "Failed to fetch notifications",
          notifications: [],
        };
      }
      return { 
        success: true, 
        data: body.data as TNotification<{user:IBaseUser,event:IBaseEvent}>[],
        message: body.message ?? "Notifications fetched.",
      };
    } catch (error: any) {
      return { success: false, message: error.message || "Server error", notifications: [] };
    }
  },
  updateNotification: async ({
    notificationId,
    action,
    invitationId,
  }: {
    notificationId: string;
    action: "READ" | "ACCEPT" | "DECLINE";
    invitationId?: string;
  }) => {
    try {
      const cookieStore = await cookies();
      const payload: Record<string, any> = { notificationId, action };
      if (invitationId) payload.invitationId = invitationId;

      const response = await fetch(`${API_BASE_URL}/notifications/respond`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });
      const body = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: body?.message || "Failed to update notification",
        };
      }
      return {
        success: true,
        message: body?.message || "Notification updated.",
        data: body?.data,
      };
    } catch (error: any) {
      return { success: false, message: error.message || "Server error" };
    }
  },
};
