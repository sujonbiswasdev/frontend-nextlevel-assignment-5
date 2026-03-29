import { fetchEvents } from "@/actions/event.actions";
import EventContent from "@/components/module/event/EventsContent";
import { TResponseEvent } from "@/types/event.types";

const EventsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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
    <EventContent
      events={eventsResponse.data?.UPCOMING as TResponseEvent<{ reviews: any[] }>[]} 
      pagination={eventsResponse.pagination}
    />
  );
};

export default EventsPage;