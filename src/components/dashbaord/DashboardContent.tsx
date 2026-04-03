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

export default DashboardContent


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

  return (
    <div className="max-w-[1380px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
        {cardData.map((card) => (
          <StatsCard
            title={card.title}
            value={card.value}
            bgGradient={card.bgGradient}
            iconName={card.iconName}
            key={card.key}
            trend={card.trend as "up" | "down" | undefined}
            percentage={card.percentage}
          />
        ))}
      </div>
    </div>
  );
};