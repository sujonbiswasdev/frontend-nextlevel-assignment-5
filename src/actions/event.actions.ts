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