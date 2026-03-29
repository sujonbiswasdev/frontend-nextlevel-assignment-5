'use client';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { fetchEvents } from '@/actions/event.actions';
import EventCard from './module/event/EventCard';
import EventCardSkeleton from './module/event/evenCardSkeleton';

const CARDS_PER_SLIDE = 3;

const UpcommingEvent = () => {
  const [upcommingEvent, setUpcomingEvent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const eventsRes = await fetchEvents({}, { revalidate: 60 });
        if (mounted) {
          setUpcomingEvent(eventsRes.data?.UPCOMING || []);
          setLoading(false);
        }
      } catch (error) {
        if (mounted) {
          setUpcomingEvent([]);
          setLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + CARDS_PER_SLIDE, Math.max(upcommingEvent.length - CARDS_PER_SLIDE, 0))
    );
  };
  setInterval(()=>{handleNext()},6000)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - CARDS_PER_SLIDE, 0));
  };

  // Determine the events to show in the current "slide"
  const visibleEvents = upcommingEvent.slice(currentIndex, currentIndex + CARDS_PER_SLIDE);

  return (
    <div>
      <section id="events" className="py-16 bg-slate-50">
        <div className="container mx-auto max-w/layout px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Upcoming Events
            </h2>
            <p className="mt-3 text-slate-600">
              Browse {upcommingEvent.length || 9} upcoming public events and join in seconds.
            </p>
          </div>
          <div className="flex justify-between items-center mb-6">
            <Button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="transition"
              variant="outline"
            >
              Prev
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentIndex + CARDS_PER_SLIDE >= upcommingEvent.length}
              className="transition"
              variant="outline"
            >
              Next
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: CARDS_PER_SLIDE }).map((_, i) => (
                  <EventCardSkeleton key={i} />
                ))
              : visibleEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpcommingEvent;