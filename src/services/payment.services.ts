import { cookies } from "next/headers";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error(
    "API_BASE_URL is not defined. Please check your environment variables.",
  );
}

export const PaymentService={
    initiatePayment: async (eventId: string) => {
        try {
          const cookieStore = await cookies();
          const res = await fetch(
            `${API_BASE_URL}/initiate-payment/${eventId}`,
            {
              method: "POST",
              headers: {
                Cookie: cookieStore.toString(),
              },
            }
          );
      
          if (!res.ok) {
            const error = await res.json();
            return {
              success: false,
              message: error.message || "Failed to initiate payment",
              data: null,
            };
          }
      
          const data = await res.json();
          return {
            success: true,
            data: data.data,
            message: data.message || "Payment initiated successfully",
          };
        } catch (err: any) {
          return {
            success: false,
            message: err?.message || "Something went wrong while initiating payment",
            data: null,
          };
        }
      },
    createParticipantPayLater: async (eventId: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(
                `${API_BASE_URL}/participant-with-pay-later/${eventId}`,
                {
                    method: "POST",
                    headers: {
                        Cookie: cookieStore.toString(),
                    },
                }
            );

            if (!res.ok) {
                const error = await res.json();
                return {
                    success: false,
                    message: error.message || "Failed to initiate Pay Later for participant",
                    data: null,
                };
            }

            const data = await res.json();
            return {
                success: true,
                data: data.data,
                message: data.message || "Pay Later initiated for participant successfully",
            };
        } catch (err: any) {
            return {
                success: false,
                message: err?.message || "Something went wrong while initiating Pay Later for participant",
                data: null,
            };
        }
    },

}