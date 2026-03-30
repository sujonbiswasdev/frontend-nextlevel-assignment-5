'use server'

import ParticipantService from "@/services/participant.services";
import { UpdateParticipantInput } from "@/validations/participant.validation";

export const createParticipant = async (eventId: string) => {
  const response = await ParticipantService.participantCreate(eventId);
  return response;
};

export const getParticipants = async (params?: any, options?: any) => {
  const response = await ParticipantService.participantRetrieve(params, options);
  return response;
};

export const updateParticipant = async (
  id: string,
  payload: UpdateParticipantInput
) => {
  return await ParticipantService.participantUpdate(id, payload);
};

export const deleteParticipantAction = async (id: string) => {
  return await ParticipantService.participantDelete(id);
};



