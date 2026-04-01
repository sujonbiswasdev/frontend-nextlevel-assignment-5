'use server'

import { PaymentService } from "@/services/payment.services";

export const initiatePayment = async (eventId: string) => {
  const response = await PaymentService.initiatePayment(eventId);
  return response;
};


export const initiatePayLater = async (eventId: string) => {
    const response = await PaymentService.createParticipantPayLater(eventId);
    return response;
};