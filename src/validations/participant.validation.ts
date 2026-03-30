import * as z from "zod";

export const Participantstatus = z.enum(["PENDING", "APPROVED", "REJECTED", "BANNED"]);
export const PaymentStatus = z.enum(["UNPAID", "PAID", "FREE"]);

export const UpdateParticipantSchema = z.object({
    status: Participantstatus.optional(),
    paymentStatus: PaymentStatus.optional()    // optional, default PENDING
  });

export type UpdateParticipantInput = z.infer<typeof UpdateParticipantSchema>;