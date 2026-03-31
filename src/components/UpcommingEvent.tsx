'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Button } from './ui/button';
import { fetchEvents } from '@/actions/event.actions';
import EventCard from './module/event/EventCard';
import EventCardSkeleton from './module/event/evenCardSkeleton';

const CARDS_PER_SLIDE = 4;

const UpcommingEvent = () => {
  const [upcommingEvent, setUpcomingEvent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const eventsRes = await fetchEvents({}, { revalidate: 2 });
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

  useEffect(() => {
    // Only auto-slide if there are more events than cards per slide
    if (upcommingEvent.length > CARDS_PER_SLIDE) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev =>
          prev + CARDS_PER_SLIDE >= upcommingEvent.length
            ? 0 // Loop back to first slide
            : prev + CARDS_PER_SLIDE
        );
      }, 6000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [upcommingEvent.length]);

  const handleNext = () => {
    setCurrentIndex(prev =>
      prev + CARDS_PER_SLIDE >= upcommingEvent.length
        ? 0
        : prev + CARDS_PER_SLIDE
    );
  };

  const handlePrev = () => {
    setCurrentIndex(prev =>
      prev - CARDS_PER_SLIDE < 0
        ? Math.max(upcommingEvent.length - CARDS_PER_SLIDE, 0)
        : prev - CARDS_PER_SLIDE
    );
  };

  // Determine the events to show in the current "slide"
  const visibleEvents = upcommingEvent.slice(currentIndex, currentIndex + CARDS_PER_SLIDE);

  // Calculate if an extra 'empty card' is needed for even width when not completely filled
  const emptySlots = CARDS_PER_SLIDE - visibleEvents.length;

  return (
    <div className="w-full">
      <section id="events" className="w-full py-12 md:py-14 bg-slate-50">
        <div className="w-full px-4 md:px-8">
          <div className="text-center mb-7 md:mb-10">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mb-2 md:mb-3">
              Upcoming Events
            </h2>
            <p className="mt-2 md:mt-3 text-sm md:text-base lg:text-lg text-slate-600 font-medium">
              Browse {upcommingEvent.length || 9} upcoming public events and join in seconds.
            </p>
          </div>
          <div className="flex justify-between items-center mb-5 md:mb-7 max-w-2xl md:max-w-3xl mx-auto gap-2 md:gap-4">
            <Button
              onClick={handlePrev}
              disabled={upcommingEvent.length <= CARDS_PER_SLIDE}
              className="transition px-5 py-1.5 text-base md:text-lg"
              variant="outline"
            >
              Prev
            </Button>
            <Button
              onClick={handleNext}
              disabled={upcommingEvent.length <= CARDS_PER_SLIDE}
              className="transition px-5 py-1.5 text-base md:text-lg"
              variant="outline"
            >
              Next
            </Button>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 w-full"
            style={{
              minHeight: 310, // Decreased height for tighter look
            }}
          >
            {loading
              ? Array.from({ length: CARDS_PER_SLIDE }).map((_, i) => (
                  <EventCardSkeleton key={i} />
                ))
              : visibleEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
            {/* Fill remaining columns with empty divs for even width */}
            {!loading && emptySlots > 0 &&
              Array.from({ length: emptySlots }).map((_, idx) => (
                <div key={`empty-${idx}`} className="invisible" aria-hidden="true"></div>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpcommingEvent;