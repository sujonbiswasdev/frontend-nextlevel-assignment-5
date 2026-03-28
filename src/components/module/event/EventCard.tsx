'use client';

import Image from "next/image";
import { Calendar, MapPin, Star, Tag, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { IBaseEvent } from "@/types/event.types";
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status";

enum EventType {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  PUBLIC_PAID = "PUBLIC_PAID",
  PRIVATE_PAID = "PRIVATE_PAID"
}

enum EventStatus {
  DRAFT = "DRAFT",
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

// Extended Props with EventType and EventStatus; add missing `categories` and `is_featured`
type EventCardProps = Pick<
  IBaseEvent,
  | "id"
  | "title"
  | "description"
  | "date"
  | "time"
  | "venue"
  | "image"
  | "visibility"
  | "status"
  | "is_featured"
  | "categories"
  | "fee"
  | "organizerId"
  | "avgRating"
  | "totalReviews"
> & {
  eventType?: EventType;
  eventStatus?: EventStatus;
};

function getEventType(visibility: string, fee: number): EventType {
  if (visibility === "PUBLIC") {
    return fee === 0 ? EventType.PUBLIC : EventType.PUBLIC_PAID;
  }
  if (visibility === "PRIVATE") {
    return fee === 0 ? EventType.PRIVATE : EventType.PRIVATE_PAID;
  }
  return EventType.PUBLIC;
}

function getStatusBadge(status: string): { label: string, color: string } {
  switch (status) {
    case EventStatus.DRAFT:
      return { label: "Draft", color: "bg-gray-400 text-white" };
    case EventStatus.UPCOMING:
      return { label: "Upcoming", color: "bg-green-500 text-white" };
    case EventStatus.ONGOING:
      return { label: "Ongoing", color: "bg-yellow-500 text-white" };
    case EventStatus.COMPLETED:
      return { label: "Completed", color: "bg-blue-600 text-white" };
    case EventStatus.CANCELLED:
      return { label: "Cancelled", color: "bg-red-500 text-white" };
    default:
      return { label: status, color: "bg-gray-400 text-white" };
  }
}

export default function EventCard({
  title,
  description,
  date,
  time,
  venue,
  image,
  fee,
  avgRating,
  totalReviews,
  categories,
  is_featured,
  visibility,
  status,
}: EventCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  const eventType = getEventType(visibility ?? "PUBLIC", fee);
  const statusBadge = getStatusBadge(status);

  return (
    <Card className="max-w-sm md:max-w-md lg:max-w-lg mx-auto shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-100 via-sky-50 to-blue-200 dark:from-gray-900 dark:to-gray-950 border border-blue-200 dark:border-gray-800">
      {/* Event Image / Placeholder */}
      <div className="relative w-full h-30 md:h-40 lg:h-50">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title}
            className="object-cover object-center transition-transform duration-500 scale-105 hover:scale-110 rounded-t-3xl"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full bg-gray-300 dark:bg-gray-800 rounded-t-3xl min-h-[8rem]">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center text-indigo-400">
                <Tag className="w-8 h-8 " />
              </div>
              <span className="text-gray-600 dark:text-gray-400 font-semibold text-base">
                Image Missing
              </span>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent rounded-t-3xl" />

        {/* Venue Badge */}
        {venue && (
          <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-gray-800/90 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow flex items-center gap-2 backdrop-blur-sm transition-all duration-200">
            <svg className="w-4 h-4 text-indigo-500 dark:text-indigo-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.418 0-8-4.03-8-9a8 8 0 1 1 16 0c0 4.97-3.582 9-8 9Zm0 0v-8m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
            </svg>
            <span className="truncate max-w-[7rem]">{venue}</span>
          </div>
        )}

        {/* Date Badge */}
        <div className="absolute top-2 left-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white/90 dark:bg-gray-800/90 text-indigo-700 dark:text-blue-100 border border-indigo-200 dark:border-gray-700 shadow backdrop-blur-sm tracking-widest">
          {formattedDate}
        </div>
      
        {/* Featured Badge */}
        {is_featured && (
          <div className="absolute bottom-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-bold shadow flex items-center gap-1">
            <Star className="w-4 h-4" fill="#FFD43B" stroke="#FFD43B" />
            Featured
          </div>
        )}
      </div>

      <CardContent className="space-y-1 py-1 px-6">

        <div className="flex justify-between">
         
           {/* Event Type */}
           <div className="flex items-center gap-3">
          {visibility === "PRIVATE" && (
            <span className="inline-block bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-200 px-2 py-0.5 rounded-full text-xs font-semibold">
              Private
            </span>
          )}
          {visibility === "PUBLIC" && (
            <span className="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 px-2 py-0.5 rounded-full text-xs font-semibold">
              Public
            </span>
          )}
          {visibility === "PUBLIC_PAID" && (
            <span className="inline-block bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-200 px-2 py-0.5 rounded-full text-xs font-semibold">
              Public (Paid)
            </span>
          )}
          {visibility === "PRIVATE_PAID" && (
            <span className="inline-block bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-200 px-2 py-0.5 rounded-full text-xs font-semibold">
              Private (Paid)
            </span>
          )}
        </div>

        </div>
     

        {/* Title & Description */}
        <CardTitle className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white line-clamp-2">
          {title}
        </CardTitle>
        <CardDescription className="text-sm md:text-base text-blue-950 dark:text-slate-200 opacity-90 font-medium line-clamp-3">
          {description}
        </CardDescription>
        {/* Categories */}
        {categories && (
          <div className="mt-1 mb-2 flex flex-wrap gap-2">
            {categories.split(",").map((cat) =>
              <span
                key={cat.trim()}
                className="inline-block bg-indigo-200 dark:bg-blue-950/50 text-indigo-800 dark:text-indigo-100 text-xs px-2 py-0.5 rounded font-bold"
              >
                {cat.trim()}
              </span>
            )}
          </div>
        )}

        {/* Details Row */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-blue-700 dark:text-blue-200 text-sm md:text-base font-medium">
          <div className="inline-flex items-center gap-2">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-indigo-500 dark:text-blue-400" />
            <span>{venue}</span>
          </div>
          <div className="inline-flex items-center gap-2">
            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-fuchsia-500 dark:text-pink-400" />
            <span>{time}</span>
          </div>
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-2 mt-2 text-yellow-500 font-bold text-sm md:text-base">
          <Star className="w-4 h-4 md:w-5 md:h-5" fill="#FFD43B" stroke="#FFD43B" />
          <span>
            {avgRating}{" "}
            <span className="text-gray-600 dark:text-gray-400 font-semibold">({totalReviews} reviews)</span>
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-xl md:text-2xl font-black text-indigo-700 dark:text-blue-200">
            {fee === 0 ? "Free" : `$${fee}`}
          </span>
          {fee !== 0 && (
            <span className="text-xs md:text-sm text-blue-700 dark:text-blue-200 bg-indigo-100 px-2 py-0.5 rounded dark:bg-blue-950/60 shadow">
              / ticket
            </span>
          )}
        </div>
      </CardContent>

      {/* Footer Actions */}
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 pb-5 px-6 bg-gradient-to-r from-indigo-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 rounded-b-3xl border-t border-indigo-200 dark:border-gray-800">
        <Button className="bg-gradient-to-tr from-indigo-700 via-indigo-500 to-fuchsia-600 hover:from-indigo-900 hover:to-fuchsia-700 text-white font-bold px-6 py-2.5 rounded-full shadow-lg text-base md:text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          size="lg"
        >
          JOIN
        </Button>
        <Button
          variant="outline"
          className="hover:bg-blue-100 dark:hover:bg-blue-950 text-indigo-700 dark:text-blue-200 border-indigo-400 dark:border-gray-700 px-6 py-2.5 rounded-full transition-all font-bold text-base md:text-lg group"
        >
          <span className="flex items-center gap-2">
            View Details
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-indigo-600 dark:text-blue-400 transform group-hover:translate-x-1 transition duration-200"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}