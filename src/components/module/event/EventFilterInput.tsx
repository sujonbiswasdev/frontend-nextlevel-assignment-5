"use client";

import { Search } from "lucide-react";

export default function EventFilterUI({
  handleChange,
  search,
  setsearch,
  searchParams,
  EventArr,
}: any) {
  return (
    <div className="w-full flex justify-center px-4 md:px-8 lg:px-12 mb-10">
      <div className="w-full max-w-[1480px]">

        {/* 🔥 Filter Container */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md p-5 md:p-6">

          {/* 🔥 Top Section */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center">

            {/* 🔍 Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type="text"
                value={search}
                placeholder="Search events, description..."
                onChange={(e) => {
                  setsearch(e.target.value);
                  handleChange("search", e.target.value);
                }}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* 🔘 Filters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">

              {/* Visibility */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">
                  Visibility
                </label>

                <select
                  onChange={(e) => handleChange("visibility", e.target.value)}
                  value={searchParams?.get("visibility") || ""}
                  className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">All</option>
                  <option value="PUBLIC">Public</option>
                  <option value="PRIVATE">Private</option>
                </select>
              </div>

              {/* Price Type */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">
                  Price Type
                </label>

                <select
                  onChange={(e) => handleChange("priceType", e.target.value)}
                  value={searchParams?.get("priceType") || ""}
                  className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">All</option>
                  {EventArr?.EVENT_Pricing_ARR.map((item: string, i: number) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">
                  Status
                </label>

                <select
                  onChange={(e) => handleChange("status", e.target.value)}
                  value={searchParams?.get("status") || ""}
                  className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">All</option>
                  {EventArr?.EVENT_Status_ARR.map((item: string, i: number) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 🔥 Bottom Section (Optional actions) */}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => handleChange("reset", "")}
              className="text-sm text-red-500 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}