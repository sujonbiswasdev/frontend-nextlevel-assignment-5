import React from 'react';
import { fetchSingleEventById } from '@/actions/event.actions';
import EventDetailsPage from '@/components/module/event/EventDetailsContent';
import { IBaseEvent, TResponseEvent } from '@/types/event.types';
import { IgetReviewData } from '@/types/review.types';
import { IBaseUser } from '@/types/user.types';

// Simple ErrorBoundary component for async server components
function ErrorBoundary({ error }: { error: Error }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-neutral-100 px-6">
      <section className="w-full max-w-xl">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-8 py-12 flex flex-col items-center">
          <span className="rounded-full bg-red-50 p-3 mb-1 shadow-sm">
            <svg className="text-red-500" height={44} width={44} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </span>
          <h1 className="text-2xl font-bold text-red-600 mb-1">
            Unable to load event
          </h1>
          <p className="text-sm text-gray-500 text-center mb-4">
            Sorry, an error occurred while loading this event. It may not exist or is temporarily unavailable.
          </p>
          <div className="text-xs text-gray-400 w-full text-center pt-3">
            {error.message}
          </div>
        </div>
      </section>
    </main>
  );
}

const EventDetailsPageWrapper = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  try {
    const { id } = await params;
    if (!id || typeof id !== "string") {
      throw new Error("Invalid event id.");
    }
    const eventData = await fetchSingleEventById(id);

    if (!eventData || !eventData.data) {
      throw new Error("Event not found.");
    }

    const singleEventData = eventData.data as TResponseEvent<{ organizer: IBaseUser; reviews: IgetReviewData[] }>;

    return (
      <div>
        <EventDetailsPage eventData={singleEventData as any} />
      </div>
    );
  } catch (error: any) {
    return <ErrorBoundary error={error} />;
  }
};

export default EventDetailsPageWrapper;