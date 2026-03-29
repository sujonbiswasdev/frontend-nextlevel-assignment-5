import { cookies } from "next/headers";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined. Please check your environment variables.");
}

const ParticipantService = {

   participantCreate: async(id:string) => {
        try {
            const cookieStore=await cookies()
          const response = await fetch(
            `${API_BASE_URL}/participant/event/${id}`,
            {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                Cookie: cookieStore.toString()
              },
            }
          );
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
          return { success: false, message: "Something went wrong. Please try again." };
        }
      }

}

export default ParticipantService;