'use server'
import EventService from "@/services/event.services";
import { ICreateEvent } from "@/types/event.types";

export const fetchEvents = async (params?: any, options?: { cache?: RequestCache; revalidate?: number }) => {
  const response = await EventService.getEvents(params, options);
  return response;
};

export const createEvent = async (eventData: ICreateEvent) => {
  const response = await EventService.createEvent(eventData);
  return response;
};
export const fetchPaidAndFreeEvents = async () => {
  const response = await EventService.getPaidAndFreeEvent();
  return response;
};

export const fetchSingleEventById = async (eventId: string) => {
  const response = await EventService.getSingleEventByType(eventId);
  return response;
};

export const getMyEvents = async (params?: any, options?: any) => {
  return await EventService.getMyEvents(params, options);
};
export const updateEvent = async (
  id: string,
  payload: Partial<{ [key: string]: any }>,
  options?: { cache?: RequestCache; revalidate?: number }
) => {
  const response = await EventService.updateEvent(id, payload, options);
  return response;
};
export const deleteEvent = async (
  id: string,
  options?: { cache?: RequestCache; revalidate?: number }
) => {
  const response = await EventService.deleteEvent(id, options);
  return response;
};