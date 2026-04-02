"use server";
import InvitationService from "@/services/invitation.services";

type InviteToEventParams = {
  eventId: string;
  inviteeId: string[];
  message?: string;
};

export const inviteToEventAction = async ({
  eventId,
  inviteeId,
  message,
}: InviteToEventParams) => {
  return await InvitationService.inviteToEvent({ eventId, inviteeId, message });
};

export const GetAllinvitaionsAction = async (params?: any, options?: any) => {
  return await InvitationService.GetAllinvitaions(params, options);
};

export const updateInvitationStatusAction = async ({
  id,
  status,
}: {
  id: string;
  status: "ACCEPTED" | "DECLINED";
}) => {
  return await InvitationService.updateInvitationStatus({ id, status });
};
export const deleteInvitationAction = async (id: string) => {
  return await InvitationService.deleteInvitation(id);
};