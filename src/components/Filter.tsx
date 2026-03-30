"use client";

import React from "react";
import { Search } from "lucide-react";
import { TFilterField } from "@/types/filter.types";

// "aro sundor daw": Make it prettier, more refined visually and semantically, slightly more animated/responsive/modern
// Responsive width & beautiful visual

export const FilterPanel = ({
  fields,
  onReset,
}: {
  fields: TFilterField[];
  onReset?: () => void;
}) => {
  return (
    <section
      className="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 rounded-3xl border border-blue-200 dark:border-blue-900/50 shadow-[0_4px_32px_rgba(34,54,174,.13)] bg-gradient-to-br from-white via-blue-50 to-blue-200 dark:from-gray-920 dark:via-blue-950/50 dark:to-blue-980/80 transition-all duration-300 animate-fade-in"
    >
      <form
        className="
          w-full
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-4 md:gap-6 xl:gap-8
          md:px-2
          mx-auto
        "
        style={{ maxWidth: "100%" }}
        autoComplete="off"
      >
        {fields.map((field) => {
          // 🔹 TEXT TYPES
          if (
            field.type === "text" ||
            field.type === "email" ||
            field.type === "password" ||
            field.type === "search" ||
            field.type === "url" ||
            field.type === "tel"
          ) {
            return (
              <div
                key={field.name}
                className="relative flex flex-col group bg-gradient-to-tr from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/90 rounded-2xl border border-gray-200 dark:border-gray-800 px-3 py-2 sm:px-4 sm:py-3 transition-all focus-within:ring-2 focus-within:ring-blue-400 shadow-sm hover:border-blue-300 w-full min-w-0"
              >
                {field.name ? (
                  <label className="mb-1 text-xs font-semibold text-blue-900 dark:text-blue-200 tracking-wide select-none transition-all">
                    {field.name}
                  </label>
                ) : null}
                <div>
                  <Search className="absolute left-4 top-[38px] md:left-5 md:top-[42px] -translate-y-1/2 w-4 h-4 text-blue-400 opacity-70 pointer-events-none transition-transform group-focus-within:scale-125" />
                  <input
                    type={field.type}
                    value={field.value}
                    placeholder={
                      typeof field.placeholder === "string"
                        ? field.placeholder
                        : "Search..."
                    }
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => field.onChange(e.target.value)}
                    className="w-full pl-8 md:pl-9 pr-3 py-2 rounded-xl bg-transparent outline-none border-0 text-sm text-blue-900 dark:text-white placeholder:text-gray-400 placeholder:font-light focus:ring-0 transition-all"
                  />
                </div>
              </div>
            );
          }

          // 🔹 NUMBER
          if (field.type === "number") {
            return (
              <div
                key={field.name}
                className="flex flex-col bg-gradient-to-tr from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/90 rounded-2xl border border-gray-200 dark:border-gray-800 px-3 py-2 sm:px-4 sm:py-3 shadow-sm hover:border-blue-300 transition-all w-full min-w-0"
              >
                {field.label && (
                  <label className="mb-1 text-xs font-semibold text-blue-900 dark:text-blue-200 tracking-wide select-none transition-all">
                    {field.label}
                  </label>
                )}
                <input
                  type="number"
                  value={field.value}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => field.onChange(Number(e.target.value))}
                  className="w-full py-2 pl-3 pr-2 rounded-xl outline-none bg-transparent border-0 text-sm text-blue-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400 transition-all"
                />
              </div>
            );
          }

          // 🔹 DATE TYPES
          if (
            field.type === "date" ||
            field.type === "time" ||
            field.type === "datetime-local" ||
            field.type === "month" ||
            field.type === "week"
          ) {
            return (
              <div
                key={field.name}
                className="flex flex-col bg-gradient-to-tr from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/90 rounded-2xl border border-gray-200 dark:border-gray-800 px-3 py-2 sm:px-4 sm:py-3 shadow-sm hover:border-blue-300 transition-all w-full min-w-0"
              >
                {field.label &&
                  <label className="mb-1 text-xs font-semibold text-blue-900 dark:text-blue-200 tracking-wide select-none transition-all">
                    {field.label}
                  </label>
                }
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => field.onChange(e.target.value)}
                  className="w-full py-2 pl-3 pr-2 rounded-xl outline-none bg-transparent border-0 text-sm text-blue-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400 transition-all"
                />
              </div>
            );
          }

          // 🔹 CHECKBOX
          if (field.type === "checkbox") {
            return (
              <div
                key={field.name}
                className="flex flex-row items-center bg-gradient-to-tr from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/90 rounded-2xl border border-gray-200 dark:border-gray-800 px-3 py-2 sm:px-4 sm:py-3 gap-2 shadow-sm hover:border-blue-300 transition-all w-full min-w-0"
              >
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => field.onChange(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 dark:border-gray-700 rounded transition-all accent-blue-500 checked:scale-125"
                />
                {field.label && (
                  <label className="text-xs font-semibold text-blue-900 dark:text-blue-200 tracking-wide select-none transition-all">
                    {field.label}
                  </label>
                )}
              </div>
            );
          }

          // 🔹 SELECT
          if (field.type === "select") {
            return (
              <div
                key={field.name}
                className="flex flex-col bg-gradient-to-tr from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/90 rounded-2xl border border-gray-200 dark:border-gray-800 px-3 py-2 sm:px-4 sm:py-3 shadow-sm hover:border-blue-300 transition-all w-full min-w-0"
              >
                <label className="mb-1 text-xs font-semibold text-blue-900 dark:text-blue-200 tracking-wide select-none transition-all">
                  {field.label}
                </label>
                <select
                  value={field.value}
                  onChange={(
                    e: React.ChangeEvent<HTMLSelectElement>
                  ) => field.onChange(e.target.value)}
                  className="w-full py-2 pl-3 pr-8 rounded-xl outline-none bg-transparent border-0 text-sm text-blue-900 dark:text-white cursor-pointer focus:ring-2 focus:ring-blue-400 transition-all"
                >
                  <option value="">All</option>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          // 🔹 RANGE
          if (field.type === "range") {
            return (
              <div
                key={field.name}
                className="flex flex-col bg-gradient-to-tr from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/90 rounded-2xl border border-gray-200 dark:border-gray-800 px-3 py-2 sm:px-4 sm:py-3 shadow-sm hover:border-blue-300 transition-all w-full min-w-0"
              >
                <label className="mb-1 text-xs font-semibold text-blue-900 dark:text-blue-200 tracking-wide select-none transition-all">
                  {field.label}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={field.min}
                    max={field.max}
                    value={field.value}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => field.onChange(Number(e.target.value))}
                    className="w-full accent-blue-500 transition-[accent-color]"
                  />
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-200 whitespace-nowrap">
                    ${field.value}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-blue-400 dark:text-blue-300 mt-1 tracking-wide">
                  <span>${field.min}</span>
                  <span>${field.max}</span>
                </div>
              </div>
            );
          }

          return null;
        })}
      </form>

      {onReset && (
        <div className="flex justify-end mt-8 w-full">
          <button
            onClick={onReset}
            type="button"
            className="inline-block bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 text-white font-semibold px-7 py-2.5 rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-700 hover:scale-[1.03] active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <span className="tracking-wide">Reset Filters</span>
          </button>
        </div>
      )}
    </section>
  );
};