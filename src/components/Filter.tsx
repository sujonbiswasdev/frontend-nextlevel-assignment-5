"use client";

import React from "react";
import { Search } from "lucide-react";
import { TFilterField } from "@/types/filter.types";

export const FilterPanel = ({
  fields,
  onReset,
}: {
  fields: TFilterField[];
  onReset?: () => void;
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 rounded-[28px] border border-white/20 dark:border-white/10 backdrop-blur-2xl bg-white/60 dark:bg-gray-900/60 shadow-[0_10px_40px_rgba(0,0,0,0.15)] transition-all duration-300">
      
      {/* Glow Background */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>

      <form
        className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
          gap-4 md:gap-6
        "
        autoComplete="off"
      >
        {fields.map((field) => {
          const base =
            "w-full rounded-xl px-3 py-2 text-sm outline-none transition-all duration-200 bg-white/70 dark:bg-gray-800/70 backdrop-blur border border-white/30 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 focus:scale-[1.02]";

          // 🔹 TEXT
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
                className="group relative flex flex-col gap-1 p-3 rounded-2xl bg-white/40 dark:bg-gray-900/40 backdrop-blur border border-white/20 hover:shadow-lg hover:-translate-y-[2px] transition-all"
              >
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  {field.name}
                </label>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 group-focus-within:scale-110 transition" />
                  <input
                    type={field.type}
                    value={field.value}
                    placeholder={field.placeholder || "Search..."}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={`${base} pl-9`}
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
                className="flex flex-col gap-1 p-3 rounded-2xl bg-white/40 dark:bg-gray-900/40 backdrop-blur border border-white/20 hover:shadow-lg transition-all"
              >
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  {field.label}
                </label>
                <input
                  type="number"
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(Number(e.target.value))
                  }
                  className={base}
                />
              </div>
            );
          }

          // 🔹 DATE
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
                className="flex flex-col gap-1 p-3 rounded-2xl bg-white/40 dark:bg-gray-900/40 backdrop-blur border border-white/20 hover:shadow-lg transition-all"
              >
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className={base}
                />
              </div>
            );
          }

          // 🔹 CHECKBOX
          if (field.type === "checkbox") {
            return (
              <div
                key={field.name}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/40 dark:bg-gray-900/40 backdrop-blur border border-white/20 hover:shadow-lg transition-all"
              >
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) =>
                    field.onChange(e.target.checked)
                  }
                  className="w-5 h-5 accent-blue-500 transition-all checked:scale-110"
                />
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {field.label}
                </label>
              </div>
            );
          }

          // 🔹 SELECT
          if (field.type === "select") {
            return (
              <div
                key={field.name}
                className="flex flex-col gap-1 p-3 rounded-2xl bg-white/40 dark:bg-gray-900/40 backdrop-blur border border-white/20 hover:shadow-lg transition-all"
              >
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  {field.label}
                </label>
                <select
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(e.target.value)
                  }
                  className={`${base} cursor-pointer`}
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
                className="flex flex-col gap-2 p-3 rounded-2xl bg-white/40 dark:bg-gray-900/40 backdrop-blur border border-white/20 hover:shadow-lg transition-all"
              >
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  {field.label}
                </label>

                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={field.min}
                    max={field.max}
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value))
                    }
                    className="w-full accent-blue-500"
                  />
                  <span className="text-sm font-bold text-blue-600">
                    ${field.value}
                  </span>
                </div>

                <div className="flex justify-between text-xs text-gray-400">
                  <span>${field.min}</span>
                  <span>${field.max}</span>
                </div>
              </div>
            );
          }

          return null;
        })}
      </form>

      {/* Reset Button */}
      {onReset && (
        <div className="flex justify-end mt-8">
          <button
            onClick={onReset}
            type="button"
            className="relative px-6 py-2.5 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span className="relative z-10">Reset Filters</span>
            <span className="absolute inset-0 rounded-xl blur opacity-40 bg-gradient-to-r from-blue-400 to-pink-400"></span>
          </button>
        </div>
      )}
    </section>
  );
};