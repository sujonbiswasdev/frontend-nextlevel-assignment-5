import { getSessionAction } from "@/actions/auth.actions";
import { getMyEvents } from "@/actions/event.actions";
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorFallback from "@/components/ErrorFallback";
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
  const myEvents = await getMyEvents(params);
  if (!myEvents || !myEvents.data) {
  return myEvents?.message || "Unknown error";
  }
  return (
    <div>
      <ErrorBoundary fallback={<ErrorFallback title="your events load failed" message="Something went wrong while loading your events." />}>
        <MyEventsTable
          Events={myEvents.data as TGroupedEvents}
          pagination={myEvents.pagination as TPagination}
          role={role as string}
        />
      </ErrorBoundary>
    </div>
  )
}

export default EventsPage