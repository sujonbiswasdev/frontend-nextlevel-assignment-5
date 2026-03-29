'use server'

import ParticipantService from "@/services/participant.services";

export const createParticipant = async (eventId: string) => {
  const response = await ParticipantService.participantCreate(eventId);
  return response;
};

export const getParticipants = async (params?: any, options?: any) => {
  const response = await ParticipantService.participantRetrieve(params, options);
  return response;
};