import { getSessionAction } from "@/actions/auth.actions";
import { getMyEvents } from "@/actions/event.actions";
import MyEventsTable from "@/components/module/event/Myevent"
import { TGroupedEvents, TPagination } from "@/types/event.types";

const EventsPage =async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const userinfo = await getSessionAction();
  const role = userinfo.data?.role;
  const myEvents = await getMyEvents(params,{ revalidate: 60 });
  return (
    <div>
      <MyEventsTable 
        Events={myEvents.data as TGroupedEvents}
        pagination={myEvents.pagination as TPagination}
        role={role as string}
      />
    </div>
  )
}

export default EventsPage