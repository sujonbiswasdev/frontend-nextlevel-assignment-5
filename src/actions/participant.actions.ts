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

export const getParticipantsByEvent = async (params?: any, options?: any) => {
  const response = await ParticipantService.getParticipantsByEvent(params, options);
  return response;
};

export const deleteEventRequiestJoinData = async (id: string) => {
  return await ParticipantService.deleteEventRequiestJoinData(id);
};




export const getOwnParticipantPayment = async (id:string) => {
  const response = await ParticipantService.getOwnPayment(id);
  return response;
};
