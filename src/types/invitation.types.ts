import { paymentStatusEnum, InvitationStatusEnum } from "@/validations/invitation.validation";

export const INVITATION_PaymentStatus_ARR = paymentStatusEnum.options;
export const INVITATION_Status_ARR = InvitationStatusEnum.options;

export const InvitationArr = {
  INVITATION_Status_ARR,
  INVITATION_PaymentStatus_ARR,
};

export type TInvitation = {
  id: string;
  eventId: string;
  inviterId: string;
  inviteeId: string;
  status: string; 
  createdAt: string;
};

export type TResponseInvitation<T = unknown> = TInvitation & T;


export type TOwnInvitations<T> = {
  receivedInvitations: TResponseInvitation<T>[];
  sentInvitations: TResponseInvitation<T>[];
};