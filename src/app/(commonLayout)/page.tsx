import { getSessionAction } from "@/actions/auth.actions";
import { fetchPaidAndFreeEvents } from "@/actions/event.actions";
import CallToAction from "@/components/CallToAction";
import EventsList from "@/components/Category";
import HeroSlider from "@/components/hero-slider";
import UpcommingEvent from "@/components/UpcommingEvent";

export default async function Home() {
  const userinfo = await getSessionAction();
  const paidAndFreeEvents = await fetchPaidAndFreeEvents();
  return (
    <div className="flex flex-col">
      <HeroSlider />
      <UpcommingEvent />
      <CallToAction />
      <EventsList events={paidAndFreeEvents.data} />
      
    </div>
  );
}
