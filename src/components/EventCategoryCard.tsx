"use client";
import { IBaseEvent } from "@/types/event.types";
import React from "react";

interface EventCategoryCardProps {
  event: IBaseEvent;
}

const EventCategoryCard: React.FC<EventCategoryCardProps> = ({ event }) => {
  const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Determine priceType label
  const priceTypeLabel =
    event.priceType === "FREE"
      ? "Free"
      : typeof event.fee === "number" && event.fee > 0
      ? `Paid - $${event.fee}`
      : "Paid";

  // Determine eventType based on visibility? For now, fallback to categories/status
  const eventType =
    event.categories && typeof event.categories === "string"
      ? event.categories
      : event.status;

  return (
    <div className="flex flex-col bg-white shadow-xl mt-3 rounded-3xl overflow-hidden hover:shadow-blue-200 hover:scale-[1.015] transition-all duration-300 border border-gray-100 relative group">
      {/* Featured Badge */}
      {event.is_featured && (
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-[12px] font-semibold shadow-md z-20 ">
          Featured
        </div>
      )}

      {/* Event image */}
      {event.image ? (
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="w-full h-44 sm:h-56 object-cover object-center group-hover:scale-105 transition-transform duration-300 rounded-t-3xl"
        />
      ) : (
        <div className="w-full h-44 sm:h-56 bg-gray-100 flex items-center justify-center text-gray-400 text-2xl font-bold rounded-t-3xl">
          No Image
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-3 flex-1 p-5 relative">
        <h3 className="text-lg md:text-2xl font-extrabold text-gray-800 truncate">{event.title}</h3>
        {/* Info line with organizer, status, and rating */}
        <div className="flex flex-wrap gap-2 items-center text-xs md:text-sm mb-2">
          <span className={"px-2 py-[2px] rounded-full font-semibold tracking-wide uppercase " +
            (event.status === "ONGOING" ? "bg-green-100 text-green-700" :
              event.status === "UPCOMING" ? "bg-blue-50 text-blue-700" :
              event.status === "COMPLETED" ? "bg-gray-100 text-gray-600" :
              event.status === "CANCELLED" ? "bg-red-100 text-red-700" : "bg-gray-50 text-gray-600")}
          >
            {event.status}
          </span>
          <span className="flex items-center gap-1">
            <svg width="16" height="16" className="text-yellow-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15.27L16.18 18l-1.64-7.03L19 7.245l-7.19-.61L10 0 8.19 6.635 1 7.245l5.46 3.725L4.82 18z"></path></svg>
            {parseFloat(event.avgRating?.toString() || "0").toFixed(1)} ({event.totalReviews ?? 0} reviews)
          </span>
        </div>
        <p className="text-gray-600 text-[15px] md:text-base leading-normal max-h-[60px] md:max-h-[72px] line-clamp-3">
          {event.description}
        </p>

        {/* Date, Time, Venue */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 text-gray-500 text-[15px] md:text-base font-medium mt-2">
          <span className="flex items-center gap-1">
            <svg width="16" height="16" fill="none" className="mr-1 text-blue-500" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.6" d="M8 2v2m8-2v2M3.5 8h17M7 12h5m-8.5 8.5V8a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 20.5 8v12a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 3.5 20z"></path></svg>
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <svg width="16" height="16" fill="none" className="mr-1 text-indigo-500" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d="M12 7v5l3 2"></path></svg>
            {event.time}
          </span>
          <span className="flex items-center gap-1">
            <svg width="16" height="16" fill="none" className="mr-1 text-emerald-500" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.6" d="M21 10.5C21 18 12 21 12 21S3 18 3 10.5A9 9 0 0 1 12 3a9 9 0 0 1 9 7.5z"/><circle cx="12" cy="10.5" r="2.5" stroke="currentColor" strokeWidth="1.6"/></svg>
            {event.venue}
          </span>
        </div>

        {/* Category + Pricing Type & Organizer */}
        <div className="flex flex-wrap justify-between items-center mt-5 gap-3">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              {eventType}
            </span>
            <span
              className={
                "inline-block px-2 py-1 rounded-full text-xs font-bold " +
                (event.priceType === "FREE"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800")
              }
            >
              {priceTypeLabel}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
          <button
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-full font-semibold transition-colors"
          >
            Join
          </button>
          <button
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs rounded-full font-semibold transition-colors"
          >
            View
          </button>
          </div>
        </div>

        {/* Card Footer with Creation date */}
        <div className="mt-4 text-xs text-gray-400 border-t pt-2 flex justify-between">
          <span>Created: {new Date(event.createdAt).toLocaleDateString()}</span>
          <span>Updated: {new Date(event.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCategoryCard;