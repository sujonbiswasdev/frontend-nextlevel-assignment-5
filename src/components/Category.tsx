"use client";

import React, { useState, useEffect } from "react";
import EventCategoryCard from "./EventCategoryCard";
import { Button } from "./ui/button";
import { IBaseEvent } from "@/types/event.types";
import Marquee from "react-fast-marquee";
import PaginationPage from "./module/event/Pagination";

interface EventsListProps {
  events: {
    PublicPaidEvent: IBaseEvent[];
    PublicFreeEvent: IBaseEvent[];
    PrivatePaidEvent: IBaseEvent[];
    PrivateFreeEvent: IBaseEvent[];
    pagination:{page:number,limit:number}
  };
}

const FILTERS = ["Public Free", "Public Paid", "Private Free", "Private Paid"];

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("Public Free");
  const [eventData, setEventData] = useState<IBaseEvent[]>([]);
  const [totalitems,settotalitems]=useState()

  // Update eventData whenever selectedFilter changes
  useEffect(() => {
    switch (selectedFilter) {
      case "Public Paid":
        settotalitems(events.PublicPaidEvent.length as any)
        setEventData(events.PublicPaidEvent);
        break;
      case "Public Free":
        settotalitems(events.PublicFreeEvent.length as any)
        setEventData(events.PublicFreeEvent);
        break;
      case "Private Paid":
        settotalitems(events.PrivatePaidEvent.length as any)
        setEventData(events.PrivatePaidEvent);
        break;
      case "Private Free":
        settotalitems(events.PrivateFreeEvent.length as any)
        setEventData(events.PrivateFreeEvent);
        break;
      default:
        setEventData([]);
    }
  }, [selectedFilter, events]);

  console.log(eventData, "pledfsdf");

  const totalPages = Math.ceil(Number(totalitems) / Number(events.pagination.limit));
  const total=Number(totalitems)
  const pagination={
    pagination:{page:events.pagination.page,limit:events.pagination.limit,total:total,totalPages}
  }

  return (
    <section className="w-full mx-auto py-8">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-8 px-2">
        {FILTERS.map((filter, index) => (
          <Button
            key={index}
            className={`px-4 py-2 rounded-full font-medium transition-colors duration-150
              ${
                selectedFilter === filter
                  ? "bg-blue-700 text-white"
                  : "bg-white text-gray-800 border border-gray-300 hover:bg-blue-50"
              }
            `}
            onClick={() =>
              setSelectedFilter(selectedFilter === filter ? "" : filter)
            }
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Events Marquee (full width marquee for all cards) */}

      <div className="w-full px-2 pt-4">
        {eventData.length > 0 ? (
          <Marquee direction="right" pauseOnClick gradient={false}>
            <div className="flex gap-8">
              {eventData.map((event) => (
                <div
                  key={event.id}
                  className="w-[300px] flex-shrink-0 mb-8"
                  style={{ maxWidth: "90vw" }}
                >
                  <EventCategoryCard event={event} />
                </div>
              ))}
            </div>
          </Marquee>
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12 text-lg">
            No events found for the selected filter.
          </div>
        )}
      </div>
      <div className="mt-10">
      <PaginationPage pagination={pagination.pagination}/>
      </div>
    </section>
  );
};

export default EventsList;