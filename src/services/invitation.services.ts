
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
};

export default InvitationService;
