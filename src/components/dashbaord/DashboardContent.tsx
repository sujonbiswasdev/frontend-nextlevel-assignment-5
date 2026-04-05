<<<<<<< HEAD
"use client";
=======
'use client'
import { DashboardData, EventStatus, EventVisivillity, MonthlyRevenue } from '@/types/stats.types'
import React from 'react'
import { DashboardBarChart, monthlyRevenue } from './DashboardBarChart'
import { ChartContainer, ChartTooltip } from '../ui/chart'
import { BarChart } from 'lucide-react'
import { Bar } from 'recharts'
import EarningChart from './chart/EarningChart'
import { StatsCard } from './StatsCard'
const DashboardContent = ({stats,eventVisivility}:{stats:DashboardData<{ monthlyRevenue: any[]; eventStatus: any; pieChartData: any[]; barChartData: any[]}>,eventVisivility:EventVisivillity}) => {
  return (
    <div>
      <FreeAndPublic statsCount={stats.priceType}/>
      <StatsCounts statsCount={stats.counts}/>
      <VisibilityPublicPrivate statsCount={eventVisivility}/>
      <EventStatusCounts eventStatus={stats.eventStatus as unknown as EventStatus} />
      <EarningChart
        stats={
          stats.monthlyRevenue as unknown as monthlyRevenue[]
        }
        earningRate={stats.totalRevenue}
      />
      </div>
  )
}
>>>>>>> 24b7ee9 (stats data)

import {
  DashboardData,
  EventStatus,
  EventVisivillity,
  MonthlyRevenue,
} from "@/types/stats.types";
import React from "react";
import EarningChart from "./chart/EarningChart";
import { StatsCard, StatCardProps } from "./StatsCard";

type StatItem = StatCardProps & { key: string };

<<<<<<< HEAD
function buildDashboardStatItems(
  stats: DashboardData<{
    monthlyRevenue: unknown[];
    eventStatus: unknown;
    pieChartData: unknown[];
    barChartData: unknown[];
  }>,
  eventVisivility: EventVisivillity,
  role: string
): StatItem[] {
  const priceTotal = Math.max(1, stats.priceType.free + stats.priceType.paid);
  const participationTotal = Math.max(
    1,
    stats.counts.participatedEvents +
      stats.counts.invitations +
      stats.counts.payments
  );
  const visTotal = Math.max(
    1,
    eventVisivility.public + eventVisivility.private
  );
  const eventStatus = stats.eventStatus as EventStatus;
  const statusTotal = Math.max(
    1,
    eventStatus.upcoming +
      eventStatus.completed +
      eventStatus.cancelled +
      eventStatus.draft +
      eventStatus.ongoing
  );

  const items: StatItem[] = [
    {
      key: "free-events",
      title: "Free Events",
      value: stats.priceType.free.toString(),
      bgGradient: "from-blue-500 to-blue-300",
      iconName: "Gift",
      percentage: ((stats.priceType.free / priceTotal) * 100).toFixed(0),
      trend: "up",
    },
    {
      key: "paid-events",
      title: "Paid Events",
      value: stats.priceType.paid.toString(),
      bgGradient: "from-yellow-500 to-yellow-300",
      iconName: "CreditCard",
      percentage: ((stats.priceType.paid / priceTotal) * 100).toFixed(0),
      trend: "up",
    },
    {
      key: "participated-events",
      title: "Participated Events",
      value: stats.counts.participatedEvents.toString(),
      bgGradient: "from-blue-500 to-blue-300",
      iconName: "Calendar",
      percentage: (
        (stats.counts.participatedEvents / participationTotal) *
        100
      ).toFixed(0),
      trend: "up",
    },
    {
      key: "invitations",
      title: "Invitations",
      value: stats.counts.invitations.toString(),
      bgGradient: "from-green-500 to-green-300",
      iconName: "Mail",
      percentage: (
        (stats.counts.invitations / participationTotal) *
        100
      ).toFixed(0),
      trend: "up",
    },
    {
      key: "payments",
      title: "Payments",
      value: stats.counts.payments.toString(),
      bgGradient: "from-purple-400 to-purple-300",
      iconName: "DollarSign",
      percentage: (
        (stats.counts.payments / participationTotal) *
        100
      ).toFixed(0),
      trend: "up",
=======
export const StatsCounts=({statsCount}:{statsCount:{participatedEvents:number;invitations:number;payments:number}})=>{
 return (
  <div className="max-w-[1380px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatsCard
        title="Participated Events"
        value={statsCount.participatedEvents.toString()}
        bgGradient="from-blue-500 to-blue-300"
        iconName="Calendar"
        key="participated-events"
        percentage={((statsCount.participatedEvents / (statsCount.participatedEvents + statsCount.invitations + statsCount.payments)) * 100).toFixed(0)}
        trend="up"
      />
      <StatsCard
        title="Invitations"
        value={statsCount.invitations.toString()}
        bgGradient="from-green-500 to-green-300"
        iconName="Mail"
        key="invitations"
        percentage={((statsCount.invitations / (statsCount.participatedEvents + statsCount.invitations + statsCount.payments)) * 100).toFixed(0)}
        trend="up"
      />
      <StatsCard
        title="Payments"
        value={statsCount.payments.toString()}
        bgGradient="from-purple-400 to-purple-300"
        iconName="DollarSign"
        key="payments"
        percentage={((statsCount.payments / (statsCount.participatedEvents + statsCount.invitations + statsCount.payments)) * 100).toFixed(0)}
        trend="up"
      />
    </div>
  </div>
 )}



 export const FreeAndPublic=({statsCount}:{statsCount:{free:number;paid:number}})=>{
  return (
   <div className="max-w-[1380px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       <StatsCard
         title="Free Events"
         value={statsCount.free.toString()}
         bgGradient="from-blue-500 to-blue-300"
         iconName="Gift"
         key="free-events"
         percentage={((statsCount.free / (statsCount.free + statsCount.paid)) * 100).toFixed(0)}
         trend="up"
       />
       <StatsCard
         title="Paid Events"
         value={statsCount.paid.toString()}
         bgGradient="from-yellow-500 to-yellow-300"
         iconName="CreditCard"
         key="paid-events"
         percentage={((statsCount.paid / (statsCount.free + statsCount.paid)) * 100).toFixed(0)}
         trend="up"
       />
     </div>
   </div>
  )}


  export const VisibilityPublicPrivate = ({ statsCount }: { statsCount: { public: number; private: number } }) => {
    console.log(
      statsCount,'se'
    )
    return (
      <div className="max-w-[1380px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            title="Public Events"
            value={statsCount.public.toString()}
            bgGradient="from-green-500 to-green-300"
            iconName="Globe"
            key="public-events"
            percentage={((statsCount.public / (statsCount.public + statsCount.private || 1)) * 100).toFixed(0)}
            trend="up"
          />
          <StatsCard
            title="Private Events"
            value={statsCount.private.toString()}
            bgGradient="from-gray-500 to-gray-300"
            iconName="Lock"
            key="private-events"
            percentage={((statsCount.private / (statsCount.public + statsCount.private || 1)) * 100).toFixed(0)}
            trend="up"
          />
        </div>
      </div>
    );
  }


export const EventStatusCounts = ({
  eventStatus,
}: {
  eventStatus: EventStatus;
}) => {
  const total =
    eventStatus.upcoming + eventStatus.completed + eventStatus.cancelled +eventStatus.draft + eventStatus.ongoing || 1; // Prevent division by zero

  const cardData = [
    {
      title: "Upcoming Events",
      value: eventStatus.upcoming.toString(),
      bgGradient: "from-cyan-500 to-cyan-300",
      iconName: "Clock",
      iconColor: "text-cyan-600",
      percentageTextColor: "text-cyan-900",
      key: "upcoming-events",
      trend: eventStatus.upcoming > 0 ? "up" : "neutral",
      percentage: ((eventStatus.upcoming / total) * 100).toFixed(0),
    },
    {
      title: "Completed Events",
      value: eventStatus.completed.toString(),
      bgGradient: "from-emerald-500 to-emerald-300",
      iconName: "CheckCircle",
      iconColor: "text-emerald-600",
      percentageTextColor: "text-emerald-900",
      key: "completed-events",
      trend: eventStatus.completed > 0 ? "up" : "neutral",
      percentage: ((eventStatus.completed / total) * 100).toFixed(0),
    },
    {
      title: "Cancelled Events",
      value: eventStatus.cancelled.toString(),
      bgGradient: "from-rose-500 to-rose-300",
      iconName: "XCircle",
      iconColor: "text-rose-600",
      percentageTextColor: "text-rose-900",
      key: "cancelled-events",
      trend: eventStatus.cancelled > 0 ? "down" : "neutral",
      percentage: ((eventStatus.cancelled / total) * 100).toFixed(0),
>>>>>>> 24b7ee9 (stats data)
    },
    {
      title: "Draft Events",
      value: eventStatus.draft.toString(),
      bgGradient: "from-sky-500 to-sky-300",
      iconName: "FileText",
      iconColor: "text-sky-600",
      percentageTextColor: "text-sky-900",
      key: "draft-events",
      trend: eventStatus.draft > 0 ? "up" : "neutral",
      percentage: ((eventStatus.draft / total) * 100).toFixed(0),
    },
    {
      title: "Ongoing Events",
      value: eventStatus.ongoing.toString(),
      bgGradient: "from-fuchsia-500 to-fuchsia-300",
      iconName: "RefreshCw",
      iconColor: "text-fuchsia-600",
      percentageTextColor: "text-fuchsia-900",
      key: "ongoing-events",
      trend: eventStatus.ongoing > 0 ? "up" : "neutral",
      percentage: ((eventStatus.ongoing / total) * 100).toFixed(0),
    },
  ];

  if (role === "ADMIN") {
    items.push({
      key: "users",
      title: "Users",
      value: stats.counts.user?.toString() ?? "—",
      bgGradient: "from-pink-400 to-pink-200",
      iconName: "Users",
      trend: "up",
    });
  }

  items.push(
    {
      key: "public-events",
      title: "Public Events",
      value: eventVisivility.public.toString(),
      bgGradient: "from-green-500 to-green-300",
      iconName: "Globe",
      percentage: ((eventVisivility.public / visTotal) * 100).toFixed(0),
      trend: "up",
    },
    {
      key: "private-events",
      title: "Private Events",
      value: eventVisivility.private.toString(),
      bgGradient: "from-gray-500 to-gray-300",
      iconName: "Lock",
      percentage: ((eventVisivility.private / visTotal) * 100).toFixed(0),
      trend: "up",
    },
    {
      key: "upcoming-events",
      title: "Upcoming Events",
      value: eventStatus.upcoming.toString(),
      bgGradient: "from-cyan-500 to-cyan-300",
      iconName: "Clock",
      percentage: ((eventStatus.upcoming / statusTotal) * 100).toFixed(0),
      trend: "up",
    },
    {
      key: "completed-events",
      title: "Completed Events",
      value: eventStatus.completed.toString(),
      bgGradient: "from-emerald-500 to-emerald-300",
      iconName: "CheckCircle",
      percentage: ((eventStatus.completed / statusTotal) * 100).toFixed(0),
      trend: "up",
    },
    {
      key: "cancelled-events",
      title: "Cancelled Events",
      value: eventStatus.cancelled.toString(),
      bgGradient: "from-rose-500 to-rose-300",
      iconName: "XCircle",
      percentage: ((eventStatus.cancelled / statusTotal) * 100).toFixed(0),
      trend: eventStatus.cancelled > 0 ? "down" : "up",
    },
    {
      key: "draft-events",
      title: "Draft Events",
      value: eventStatus.draft.toString(),
      bgGradient: "from-sky-500 to-sky-300",
      iconName: "FileText",
      percentage: ((eventStatus.draft / statusTotal) * 100).toFixed(0),
      trend: "up",
    },
    {
      key: "ongoing-events",
      title: "Ongoing Events",
      value: eventStatus.ongoing.toString(),
      bgGradient: "from-fuchsia-500 to-fuchsia-300",
      iconName: "RefreshCw",
      percentage: ((eventStatus.ongoing / statusTotal) * 100).toFixed(0),
      trend: "up",
    }
  );

  return items;
}

const DashboardContent = ({
  stats,
  eventVisivility,
  role,
}: {
  stats: DashboardData<{
    monthlyRevenue: unknown[];
    eventStatus: unknown;
    pieChartData: unknown[];
    barChartData: unknown[];
  }>;
  eventVisivility: EventVisivillity;
  role: string;
}) => {
  const statItems = buildDashboardStatItems(stats, eventVisivility, role);

  return (
<<<<<<< HEAD
    <div className="w-full overflow-y-clip pb-8">
      <div className="grid auto-rows-fr grid-cols-1 gap-5 pt-1 sm:grid-cols-2 sm:pt-2 lg:grid-cols-3">
        {statItems.map((item) => (
=======
    <div className="max-w-[1380px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
        {cardData.map((card) => (
>>>>>>> 24b7ee9 (stats data)
          <StatsCard
            key={item.key}
            title={item.title}
            value={item.value}
            bgGradient={item.bgGradient}
            iconName={item.iconName}
            trend={item.trend}
            percentage={item.percentage}
          />
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
        <EarningChart
          stats={stats.monthlyRevenue as unknown as MonthlyRevenue[]}
          earningRate={stats.totalRevenue}
        />
      </div>
    </div>
  );
};

export default DashboardContent;
