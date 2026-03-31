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

export const getOwnUserInvitationsAction = async (params?: any, options?: any) => {
  return await InvitationService.GetuserownInvitations(params, options);
};