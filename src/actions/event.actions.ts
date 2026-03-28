'use server'
import EventService from "@/services/event.services";
import { TCreateEvent } from "@/types/event.types";

export const fetchEvents = async (params?: any, options?: { cache?: RequestCache; revalidate?: number }) => {
  const response = await EventService.getEvents(params, options);
  return response;
};

