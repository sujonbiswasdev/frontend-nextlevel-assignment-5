"use client";

import { startTransition, useRef, useState } from "react";
import EventCard from "./EventCard";
import EventCardSkeleton from "./evenCardSkeleton";
import { EventArr, TPagination, TResponseEvent } from "@/types/event.types";
import PaginationPage from "./Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useFilter } from "@/components/ReusableFilter";
import EventFilterUI from "./EventFilterInput";
import { Search } from "lucide-react";

interface EventContentProps {
  events: TResponseEvent<{ reviews: any[] }>[];
  pagination: TPagination;
}

export default function EventContent({
  events,
  pagination,
}: EventContentProps) {
  const [loading] = useState(false);
  const searchParams = useSearchParams();
  const [search, setsearch] = useState("");
  const router=useRouter()
  

  const { updateFilters, reset, isPending } = useFilter();

  const [form, setForm] = useState({
    search: "",
    fee: 0,
    visibility: "",
    status: "",
  });
  const handleChange = (key: string, value: string) => {
    const updated = { ...form, [key]: value };
    setForm(updated);

    updateFilters(updated);
  };

  const filteredEvents = events.filter((event: any) => {
    const s = search.toLowerCase();
    return (
      event.title?.toLowerCase().includes(s) ||
      event.description?.toLowerCase().includes(s)
    );
  });

  return (
    <section className="w-full flex justify-center px-4 md:px-8 lg:px-12 py-10 max-w-[1480px] mx-auto">
      <div className="w-full">
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Discover Amazing Events
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore curated events, connect with communities, and create
            unforgettable experiences.
          </p>
        </div>

        <div className="w-full flex justify-center px-0 md:px-4 lg:px-10 mb-12">
          <div className="w-full max-w-[1400px] relative">
            {/* Decorative top bar */}
            <div className="absolute -top-7 left-10 right-10 h-2 bg-gradient-to-r from-blue-200/40 via-violet-100/50 to-emerald-200/40 rounded-full blur-[2px] z-0" />

            {/* Filter Panel */}
            <div className="relative z-10 bg-gradient-to-br from-white/95 via-blue-50/80 to-neutral-100/90 dark:from-gray-950/90 dark:via-gray-900/80 dark:to-gray-900/90 border border-blue-100 dark:border-blue-900/40 rounded-3xl shadow-xl shadow-blue-100/35 dark:shadow-blue-900/15 p-7 md:p-10">
              {/* Top Section */}
              <div className="flex flex-col lg:flex-row gap-8 lg:items-center transition-all duration-300">
                {/* Search */}
                <div className="relative flex-1 flex items-center bg-gradient-to-l from-blue-100/60 via-transparent to-blue-50/20 dark:from-blue-900/25 rounded-2xl overflow-hidden border border-blue-200 dark:border-blue-900 shadow-inner transition-all duration-300 group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400 dark:text-blue-300 w-6 h-6 z-10" />
                  <input
                    type="text"
                    value={search}
                    placeholder="Type to search for events or explore categories..."
                    onChange={(e) => {
                      setsearch(e.target.value);
                    }}
                    className="w-full pl-16 pr-6 py-4 rounded-2xl bg-transparent text-base text-blue-900 dark:text-blue-100 placeholder:text-blue-400 placeholder:font-medium font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400/50 dark:focus:ring-blue-700/50 transition-all"
                  />
                </div>

                {/* Filter Grid */}
                <div className="grid grid-cols-12 gap-x-4 gap-y-4 flex-1">
                  {/* Visibility */}
                  <div className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col">
                    <label className="text-xs font-bold text-blue-800 dark:text-blue-200 tracking-wide uppercase mb-1 ml-1">
                      Visibility
                    </label>
                    <select
                      onChange={(e) => handleChange("visibility", e.target.value)}
                      value={searchParams?.get("visibility") || ""}
                      className="py-2 px-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-gradient-to-l from-blue-100/40 via-transparent to-white/30 dark:from-blue-950/20 text-sm text-blue-900 dark:text-blue-200 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800 outline-none font-medium transition-all"
                    >
                      <option value="">All</option>
                      <option value="PUBLIC">Public</option>
                      <option value="PRIVATE">Private</option>
                    </select>
                  </div>

                  {/* Price Type */}
                  <div className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col">
                    <label className="text-xs font-bold text-blue-800 dark:text-blue-200 tracking-wide uppercase mb-1 ml-1">
                      Price Type
                    </label>
                    <select
                      onChange={(e) => handleChange("priceType", e.target.value)}
                      value={searchParams?.get("priceType") || ""}
                      className="py-2 px-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-gradient-to-l from-blue-100/40 via-transparent to-white/30 dark:from-blue-950/20 text-sm text-blue-900 dark:text-blue-200 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800 outline-none font-medium transition-all"
                    >
                      <option value="">All</option>
                      {EventArr?.EVENT_Pricing_ARR.map(
                        (item: string, i: number) => (
                          <option key={i} value={item}>
                            {item}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  {/* Price Slider */}
                  <div className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col">
                    <label className="text-xs font-bold text-blue-800 dark:text-blue-200 tracking-wide uppercase mb-1 ml-1">
                      Price (USD)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={1}
                        max={2000}
                        onChange={(e) => handleChange('fee', e.target.value)}
                        value={Number(searchParams?.get("fee")) || 1}
                        className="w-full accent-blue-500 dark:accent-indigo-600 cursor-pointer"
                      />
                      <span className="ml-2 text-xs font-semibold text-blue-700 dark:text-blue-200 bg-blue-100/70 dark:bg-blue-900/20 px-2 py-0.5 rounded shadow">
                        ${searchParams?.get("fee") || 1}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col">
                    <label className="text-xs font-bold text-blue-800 dark:text-blue-200 tracking-wide uppercase mb-1 ml-1">
                      Status
                    </label>
                    <select
                      onChange={(e) => handleChange("status", e.target.value)}
                      value={searchParams?.get("status") || ""}
                      className="py-2 px-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-gradient-to-l from-blue-100/40 via-transparent to-white/30 dark:from-blue-950/20 text-sm text-blue-900 dark:text-blue-200 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800 outline-none font-medium transition-all"
                    >
                      <option value="">All</option>
                      {EventArr?.EVENT_Status_ARR.map(
                        (item: string, i: number) => (
                          <option key={i} value={item}>
                            {item}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </div>
              </div>
              {/* Bottom Section (Optional actions) */}
              <div className="flex justify-end mt-7">
                <button
                  onClick={() =>{ handleChange("reset", "") ,router.push('/events')}}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-pink-600 dark:text-pink-400 hover:underline hover:text-red-500 transition-all px-4 py-2 rounded-xl bg-pink-50/50 dark:bg-pink-800/10 shadow hover:shadow-pink-200 dark:hover:bg-pink-900/25"
                >
                  <svg viewBox="0 0 18 18" fill="none" className="w-4 h-4 stroke-pink-500 mr-1">
                    <path d="M6.75 14.25A6 6 0 1 1 15 9m0 0V3.75M15 9h-5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* EVENTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 mt-6">
          {loading
            ? Array.from({ length: events.length || 8 }).map((_, i) => (
                <EventCardSkeleton key={i} />
              ))
            : filteredEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
        </div>

        {/* PAGINATION */}
        <PaginationPage pagination={pagination} />
      </div>
    </section>
  );
}
