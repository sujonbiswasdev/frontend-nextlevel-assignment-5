"use client";

import { getIconComponent } from "@/lib/iconMapper";
import React from "react";

export type StatCardProps = {
  title: string;
  value: string | number;
  percentage?: string;
  trend?: "up" | "down";
  iconName?: string; // dynamic icon name
  bgGradient?: string;
};

export const StatsCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentage,
  trend = "up",
  iconName,
  bgGradient = "from-gray-300 via-white to-gray-400",
}) => {
  const trendColor = trend === "up" ? "text-yellow-500" : "text-red-500";

  // Fix for LucideIcon issue
  const IconComponent = iconName ? getIconComponent(iconName) : null;
  const trendIcon =
    trend === "up"
      ? getIconComponent("ArrowUpRight")
      : getIconComponent("ArrowDownRight");

  return (
    <div className={`group relative flex h-full min-h-[148px] overflow-hidden rounded-2xl border border-gray-200/50 bg-gradient-to-br ${bgGradient} p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
      
      {/* Glow/Highlight */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-indigo-200/20 via-transparent to-purple-200/20 blur-2xl" />

      <div className="relative flex flex-1 flex-col space-y-3">
        {/* Title + Icon */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-600 tracking-wide">{title}</h3>
          {IconComponent && (
            <span className="inline-flex items-center justify-center rounded-full shadow bg-white w-8 h-8">
              {React.createElement(IconComponent, {
                className: "w-5 h-5 text-blue-500",
              })}
            </span>
          )}
        </div>

        {/* Value + Trend */}
        <div className="flex items-end justify-between">
          <span className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{value}</span>
          {percentage && (
            <div className={`flex items-center gap-1 text-sm font-semibold ${trendColor}`}>
              {trendIcon && React.createElement(trendIcon, { className: "w-4 h-4" })}
              {percentage}
            </div>
          )}
        </div>

        {/* Mini sparkline effect */}
       {title=="Users"?"": <div className="relative w-full h-2 rounded-full bg-gradient-to-r from-indigo-100 via-white to-purple-100 shadow-inner overflow-hidden">
          <div
            className="absolute top-0 left-0 h-3 py-1 rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 transition-all duration-700 ease-in-out shadow-md"
            style={{
              width: percentage
                ? `${Math.min(100, Math.max(0, parseFloat(percentage)))}%`
                : "50%",
              minWidth: "0.5rem",
              maxWidth: "100%",
              transition: "width 0.7s cubic-bezier(0.4,1.5,0.3,1)",
              boxShadow: "0 1px 8px 0 rgba(138,43,226,0.13)",
              opacity: 0.87,
            }}
          />
          <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <span className="text-[10px] font-medium text-gray-200 bg-gray-800/80 rounded-full px-2 py-0.5 shadow">
              {percentage || "--"}%
            </span>
          </div>
        </div>}
      </div>
    </div>
  );
};