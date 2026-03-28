import { fetchEvents } from '@/actions/event.actions';

import EventsContent from '@/components/module/event/EventsContent';
import { TResponseEvent } from '@/types/event.types';

const EventsPage =async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {

  const search=await searchParams
  const eventsResponse = await fetchEvents(search, { revalidate: 60 });
   
  return (
   <>
   <EventsContent events={eventsResponse.data?.UPCOMING  as TResponseEvent<{reviews:any[]}>[]} pagination={eventsResponse.pagination}/>
   </>
  )
}

export default EventsPage