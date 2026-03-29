"use client";

import ImageSkeleton from "@/components/ImageSkeleton";
import { Calendar, MapPin, Star } from "lucide-react";
import Link from "next/link";

export default function EventCard({
  id,
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
  image: profile,
  name,
  is_featured,
}: any) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="group rounded-2xl overflow-hidden border bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition duration-300 flex flex-col">

      {/* IMAGE */}
      <div className="relative h-56 w-full overflow-hidden">
        {image ? (
          <ImageSkeleton src={image} alt={title} />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-800">
            <span className="text-base text-gray-500">No Image</span>
          </div>
        )}

        <div className="absolute top-4 left-4 bg-white/90 text-sm px-4 py-1.5 rounded-full font-semibold shadow">
          {formattedDate}
        </div>

        {is_featured && (
          <div className="absolute bottom-4 right-4 bg-yellow-400 text-sm px-4 py-1.5 rounded-full font-bold flex items-center gap-1 shadow">
            <Star className="w-4 h-4 fill-yellow-700" />
            <span>Featured</span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 px-6 py-6 space-y-5">

        {/* Organizer profiles */}
        <div>
          <div className="flex items-center ">
            {(Array.isArray(profile) ? profile.slice(0, 5) : [profile]).map((imgSrc: string, idx: number) => (
              <img
                key={idx}
                src={imgSrc}
                alt="Organizer's profile avatar"
                className={`w-8 h-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 shadow-md transition-transform duration-200 ease-in-out hover:scale-110 ${idx !== 0 ? '-ml-3' : ''}`}
              />
            ))}
            {Array.isArray(profile) && profile.length > 5 && (
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-300 font-semibold whitespace-nowrap">
                +{profile.length - 5}
              </span>
            )}
          </div>
          {name && (
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{name}</div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-1 tracking-tight leading-snug break-words">
          {title}
        </h3>

        {/* Description */}
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-2 line-clamp-3">
          {description}
        </p>


        <div className="flex justify-between space-x-1">


        <div>
            {/* Categories */}
        {categories && (
          <div className="flex flex-wrap gap-3 mb-2">
            {categories.split(",").map((cat: string) => (
              <span
                key={cat.trim()}
                className="text-xs bg-blue-100 dark:bg-gray-800 text-blue-700 dark:text-gray-300 px-3 py-1 rounded-full tracking-wide font-medium"
              >
                {cat.trim()}
              </span>
            ))}
          </div>
        )}

          {/* Rating section */}
          <div className="flex items-center gap-2 text-base text-yellow-500 font-semibold mb-2">
          <Star size={16} className="fill-yellow-500" />
          <span>{avgRating ?? "0.0"}</span>
          <span className="text-gray-500 dark:text-gray-400">({totalReviews ?? 0})</span>
        </div>

        </div>

      

        {/* Event details */}
        <div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span className="truncate">{venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{time}</span>
          </div>
        </div>
        </div>

        {/* Footer: Fee and Button */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400 tracking-tight">
            {fee === 0 ? "Free" : fee != null ? `$${fee}` : "-"}
          </span>
          <Link href={`/events/${id}`}>
          view
          </Link>
          <button  className="text-base font-semibold bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none transition shadow-sm">
            View
          </button>
        </div>

      </div>
    </div>
  );
}