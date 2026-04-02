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

export const getAllPayments = async (params?: Record<string, any>) => {
  const response = await PaymentService.getAllPayments(params);
  return response;
};

export const updatePaymentStatus = async (paymentId: string, status: string) => {
  const response = await PaymentService.updatePaymentStatus(paymentId, status);
  return response;
};
export const deletePayment = async (paymentId: string) => {
  const response = await PaymentService.deletePayment(paymentId);
  return response;

};