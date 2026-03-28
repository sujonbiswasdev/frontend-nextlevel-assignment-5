import EventService from "@/services/event.services";

export const fetchEvents = async (params?: any, options?: { cache?: RequestCache; revalidate?: number }) => {
  const response = await EventService.getEvents(params, options);
  return response;
};