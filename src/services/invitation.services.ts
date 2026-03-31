
import { TOwnInvitations, TResponseInvitation } from "@/types/invitation.types";
import { cookies } from "next/headers";
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
      const response = await fetch(`${API_BASE_URL}/invitation/event/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ inviteeId, message }),
      });
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

  GetuserownInvitations: async () => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${API_BASE_URL}/invitation/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const body = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: body?.message || "Failed to fetch invitations",
        };
      }
      return {
        success: true,
        message: body.message || "Invitations fetched successfully",
        data: body.data as TOwnInvitations<TResponseInvitation>,
      };
    } catch (error: any) {
      return { success: false, message: error.message || "Server error" };
    }
  },

  getSentInvitationsByUser: async (userId: string) => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${API_BASE_URL}/invitation/sent/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const body = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: body?.message || "Failed to fetch sent invitations",
        };
      }
      return {
        success: true,
        message: body.message || "Sent invitations fetched successfully",
        data: body.data,
      };
    } catch (error: any) {
      return { success: false, message: error.message || "Server error" };
    }
  },

  acceptInvitation: async (invitationId: string) => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${API_BASE_URL}/invitation/${invitationId}/accept`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const body = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: body?.message || "Failed to accept invitation",
        };
      }
      return {
        success: true,
        message: body.message || "Invitation accepted successfully",
        data: body.data,
      };
    } catch (error: any) {
      return { success: false, message: error.message || "Server error" };
    }
  },

  rejectInvitation: async (invitationId: string) => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${API_BASE_URL}/invitation/${invitationId}/reject`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const body = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: body?.message || "Failed to reject invitation",
        };
      }
      return {
        success: true,
        message: body.message || "Invitation rejected successfully",
        data: body.data,
      };
    } catch (error: any) {
      return { success: false, message: error.message || "Server error" };
    }
  },

  deleteInvitation: async (invitationId: string) => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${API_BASE_URL}/invitation/${invitationId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const body = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: body?.message || "Failed to delete invitation",
        };
      }
      return {
        success: true,
        message: body.message || "Invitation deleted successfully",
        data: body.data,
      };
    } catch (error: any) {
      return { success: false, message: error.message || "Server error" };
    }
  },
};

export default InvitationService;
