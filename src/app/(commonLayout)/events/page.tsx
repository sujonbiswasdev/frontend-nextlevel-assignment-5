import { fetchEvents } from "@/actions/event.actions";
import EventContent from "@/components/module/event/EventsContent";
import { cn } from "@/lib/utils";
import { TPagination, TResponseEvent } from "@/types/event.types";
import React from "react";

const EventsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  let eventsResponse;
  try {
    const search = await searchParams;
    eventsResponse = await fetchEvents(search, { revalidate: 2 });
  } catch (err) {
    console.error("Events fetch error:", err);
    eventsResponse = { data: { UPCOMING: [] }, pagination: { total: 0, page: 1, limit: 10, totalpage: 1 } };
  }

  return (
   <div className={"mt-10"}>
     <EventContent
      events={eventsResponse.data?.UPCOMING as TResponseEvent<{ reviews: any[] }>[]} 
      pagination={eventsResponse.pagination as TPagination}
    />
   </div>
  );
};

export default EventsPage;