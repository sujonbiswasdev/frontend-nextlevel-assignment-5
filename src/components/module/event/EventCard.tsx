"use client";

import ImageSkeleton from "@/components/ImageSkeleton";
import { Calendar, MapPin, Star } from "lucide-react";

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
  image:profile,
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
      <div className="relative h-52 w-full overflow-hidden">

        {image ? (
          <ImageSkeleton src={image} alt={title} />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-800">
            <span className="text-sm text-gray-500">No Image</span>
          </div>
        )}

        <div className="absolute top-3 left-3 bg-white/90 text-xs px-3 py-1 rounded-full font-semibold shadow">
          {formattedDate}
        </div>

        {is_featured && (
          <div className="absolute bottom-3 right-3 bg-yellow-400 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-700" />
            Featured
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-5 space-y-3">

        <div>
          {/* Organizer profile images with count if more than 5 */}
          <div className="flex items-center">
            {(Array.isArray(profile) ? profile.slice(0, 5) : [profile]).map((imgSrc: string, idx: number) => (
              <img
                key={idx}
                src={imgSrc}
                alt="Organizer's profile avatar"
                className={`w-6 h-6 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 shadow-md transition-transform duration-200 ease-in-out hover:scale-125 ${idx !== 0 ? '-ml-2' : ''}`}
              />
            ))}
            {Array.isArray(profile) && profile.length > 5 && (
              <span className="ml-2 text-xs text-gray-600 dark:text-gray-300 font-semibold">
                +{profile.length - 5}
              </span>
            )}
          </div>

        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {description}
        </p>

        {/* CATEGORIES */}
        {categories && (
          <div className="flex flex-wrap gap-2">
            {categories.split(",").map((cat: string) => (
              <span
                key={cat}
                className="text-xs bg-blue-100 dark:bg-gray-800 text-blue-700 dark:text-gray-300 px-2 py-1 rounded"
              >
                {cat.trim()}
              </span>
            ))}
          </div>
        )}

        {/* DETAILS */}
        <div className="text-sm text-gray-500 flex flex-col gap-1">

          <div className="flex items-center gap-2">
            <MapPin size={14} />
            {venue}
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={14} />
            {time}
          </div>

        </div>

        {/* RATING */}
        <div className="flex items-center gap-2 text-sm text-yellow-500 font-semibold">
          <Star size={14} className="fill-yellow-500" />
          {avgRating} ({totalReviews})
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-auto pt-3">

          <span className="text-lg font-bold text-blue-600">
            {fee === 0 ? "Free" : `$${fee}`}
          </span>

          <button className="text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            View
          </button>

        </div>
      </div>
    </div>
  );
}