"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { toast } from "sonner";
import { Filter, X } from "lucide-react";

import EventCard from "./EventCard";
import PaginationPage from "./Pagination";
import { TPagination, TResponseEvent } from "@/types/event.types";

const statuses = ["DRAFT", "UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"] as const;

export default function EventContent({
  events,
  pagination,
}: {
  events: TResponseEvent<{ reviews: any[] }>[];
  pagination: TPagination;
}) {

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  // ✅ URL state sync
  const [selectedStatus, setSelectedStatus] = useState<typeof statuses[number]>(
    (searchParams.get("status") as typeof statuses[number]) || "UPCOMING"
  );

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  // ✅ Update URL safely
  const updateFilters = (filters: Record<string, string | null>) => {
    try {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(filters).forEach(([key, value]) => {
        if (!value) params.delete(key);
        else params.set(key, value);
      });

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    } catch (error) {
      toast.error("Filter update failed");
    }
  };

  // ✅ SAFE FILTER (NO CRASH)
  const filteredEvents = useMemo(() => {
    try {
      return events.filter((event) => {

        const searchLower = search.toLowerCase();

        const matchStatus = event?.status === selectedStatus;

        const matchSearch =
          event?.title?.toLowerCase()?.includes(searchLower) ||
          event?.description?.toLowerCase()?.includes(searchLower) ||
          event?.categories?.toLowerCase()?.includes(searchLower) ||
          event?.venue?.toLowerCase()?.includes(searchLower);

        const fee = Number(event?.fee ?? 0);

        const matchPrice =
          fee >= priceRange[0] && fee <= priceRange[1];

        return matchStatus && matchSearch && matchPrice;

      });
    } catch (error) {
      toast.error("Filtering error");
      return [];
    }
  }, [events, search, selectedStatus, priceRange]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 md:px-8 lg:px-16">

      <div className="max-w-[1480px] mx-auto">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-2">
            Discover Exceptional Events Tailored for You
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
            Unlock exclusive experiences, connect with inspiring communities, and elevate your moments—explore our handpicked events curated just for you. Start your next extraordinary journey today!
          </p>
        </div>

        <div className="flex gap-6">

          {/* 🔥 SIDEBAR FILTER */}
          <aside
            className={`
              fixed top-0 left-0 w-80 h-full bg-white dark:bg-gray-900 z-50 p-6 shadow-xl
              transform transition-transform duration-300
              lg:relative lg:translate-x-0 lg:block
              ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            {/* Close */}
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setIsOpen(false)} className="lg:hidden">
                <X />
              </button>
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                updateFilters({ search: e.target.value });
              }}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
            />

            {/* Price Range */}
            <div className="mb-6">
              <input
                type="range"
                min="0"
                max="10000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([0, Number(e.target.value)])
                }
                className="w-full"
              />
              <p className="text-sm text-blue-600 mt-1">
                Up to ${priceRange[1]}
              </p>
            </div>

            {/* Status */}
            <div className="space-y-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    updateFilters({ status });
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    selectedStatus === status
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-blue-100"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                setSearch("");
                setPriceRange([0, 10000]);
                setSelectedStatus("UPCOMING");
                router.push(pathname);
              }}
              className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg"
            >
              Reset Filters
            </button>
          </aside>

          {/* EVENTS */}
          <div className="flex-1">

            {filteredEvents.length === 0 ? (
              <p className="text-gray-500">No events found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
            )}

          </div>

        </div>
      </div>

      {/* PAGINATION */}
      <div className="mt-10 max-w-[1480px] mx-auto">
        <PaginationPage pagination={pagination} />
      </div>
    </div>
  );
}