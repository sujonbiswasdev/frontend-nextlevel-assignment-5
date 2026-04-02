import { getSessionAction } from "@/actions/auth.actions";
import { fetchPaidAndFreeEvents, getFeaturedEvent } from "@/actions/event.actions";
import CallToAction from "@/components/CallToAction";
import EventsList from "@/components/Category";
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorFallback from "@/components/ErrorFallback";
import HeroSlider from "@/components/hero-slider";
import UpcommingEvent from "@/components/UpcommingEvent";
import NotFoundItem from "@/components/NotFoundItem";
import { IBaseEvent } from "@/types/event.types";

export default async function Home() {

   let paidAndFreeEvents = await fetchPaidAndFreeEvents();
   let isfeatured=await getFeaturedEvent()
   if(!isfeatured.success || !isfeatured.data){
    return (
      <div>
        <NotFoundItem content="Sorry, no featured event available at this time." />
      </div>
    )
   }
   

  return (
    <div className="flex flex-col">
      <HeroSlider data={isfeatured.data as IBaseEvent[]} />
      <UpcommingEvent />
      <CallToAction />
      <ErrorBoundary fallback={<ErrorFallback title="Failed to load events list." />}>
        {!paidAndFreeEvents || !paidAndFreeEvents.data || !paidAndFreeEvents.success?<><ErrorBoundary fallback={<ErrorFallback title={paidAndFreeEvents?.message || "No events data returned from server."} />}>
          <NotFoundItem
            content="No Events Available"
            filter="Sorry, we couldn't find any upcoming events right now. Please check back later or explore other sections of our site."
            emoji="😔"
          />
        </ErrorBoundary></>:<EventsList events={paidAndFreeEvents.data} />}
      </ErrorBoundary>
    </div>
  );
}
