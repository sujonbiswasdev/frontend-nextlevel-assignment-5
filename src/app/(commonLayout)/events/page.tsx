import { fetchEvents } from "@/actions/event.actions";
import EventContent from "@/components/module/event/EventsContent";
import { cn } from "@/lib/utils";
import { TResponseEvent } from "@/types/event.types";
import React from "react";

const EventsPage = async ({
  searchParams,
  className
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;className?:React.ButtonHTMLAttributes<HTMLButtonElement>
}) => {
  let eventsResponse;
  try {
    const search = await searchParams;
    eventsResponse = await fetchEvents(search, { revalidate: 60 });
  } catch (err) {
    console.error("Events fetch error:", err);
    eventsResponse = { data: { UPCOMING: [] }, pagination: { total: 0, page: 1, limit: 10, totalpage: 1 } };
  }

  return (
   <div className={"mt-10"}>
     <EventContent
      events={eventsResponse.data?.UPCOMING as TResponseEvent<{ reviews: any[] }>[]} 
      pagination={eventsResponse.pagination}
    />
   </div>
  );
};

export default EventsPage;