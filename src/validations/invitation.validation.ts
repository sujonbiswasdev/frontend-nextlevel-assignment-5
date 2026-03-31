import z from "zod";

export const InvitationStatusEnum = z.enum([
  "PENDING",
  "ACCEPTED",
  "DECLINED",
]);
export const paymentStatusEnum = z.enum(["PENDING", "FREE", "FAILED", "SUCCESS"]);


export const updateInvitationSchema = z.object({
  status:InvitationStatusEnum.optional(),
  paymentStatus:paymentStatusEnum.optional(),
});