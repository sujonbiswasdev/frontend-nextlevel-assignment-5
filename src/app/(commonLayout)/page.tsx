import { getSessionAction } from "@/actions/auth.actions";
import { fetchPaidAndFreeEvents } from "@/actions/event.actions";
import CallToAction from "@/components/CallToAction";
import EventsList from "@/components/Category";
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorFallback from "@/components/ErrorFallback";
import HeroSlider from "@/components/hero-slider";
import UpcommingEvent from "@/components/UpcommingEvent";

export default async function Home() {
  const paidAndFreeEvents = await fetchPaidAndFreeEvents();
  if (!paidAndFreeEvents || !paidAndFreeEvents.success || !paidAndFreeEvents.data) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="p-8 rounded-lg shadow bg-white flex flex-col items-center max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">No Events Available</h2>
        <p className="text-gray-500 mb-4 text-center">
          Sorry, we couldn't find any upcoming events right now.<br />
          Please check back later or explore other sections of our site.
        </p>
        <span className="inline-block rounded-full bg-red-100 text-red-700 text-xs px-3 py-1 font-semibold">
          {paidAndFreeEvents?.message || "No events data returned from server."}
        </span>
      </div>
    </div>
  );
  }
  return (
    <div className="flex flex-col">
      <HeroSlider />
      <UpcommingEvent />
      <CallToAction />
      {/* Simple error boundary for EventsList */}
      <ErrorBoundary fallback={<ErrorFallback title="Events Error" message="There was a problem loading events." />}>
        <EventsList events={paidAndFreeEvents.data} />
      </ErrorBoundary>
    </div>
  );
}
