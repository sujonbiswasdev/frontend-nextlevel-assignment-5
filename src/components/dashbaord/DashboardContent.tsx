'use client'
import { DashboardData, MonthlyRevenue } from '@/types/stats.types'
import React from 'react'
import { DashboardBarChart, monthlyRevenue } from './DashboardBarChart'
import { ChartContainer, ChartTooltip } from '../ui/chart'
import { BarChart } from 'lucide-react'
import { Bar } from 'recharts'
import EarningChart from './chart/EarningChart'
import { StatsCard } from './StatsCard'
const DashboardContent = ({stats}:{stats:DashboardData<{ monthlyRevenue: any[]; eventStatus: any; pieChartData: any[]; barChartData: any[]}>}) => {
  return (
    <div>
      <StatsCounts statsCount={stats.counts}/>
      <EventStatusCounts eventStatus={stats.eventStatus as unknown as { upcoming: number; completed: number; cancelled: number }} />
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
        bgGradient="from-purple-500 to-purple-300"
        iconName="DollarSign"
        key="payments"
        percentage={((statsCount.payments / (statsCount.participatedEvents + statsCount.invitations + statsCount.payments)) * 100).toFixed(0)}
        trend="up"
      />
    </div>
  </div>
 )}




export const EventStatusCounts = ({
  eventStatus,
}: {
  eventStatus: { upcoming: number; completed: number; cancelled: number };
}) => {
  const total =
    eventStatus.upcoming + eventStatus.completed + eventStatus.cancelled || 1; // Prevent division by zero

  const cardData = [
    {
      title: "Upcoming Events",
      value: eventStatus.upcoming.toString(),
      bgGradient: "from-yellow-500 to-yellow-300",
      iconName: "Clock",
      key: "upcoming-events",
      trend: eventStatus.upcoming > 0 ? "up" : "neutral",
      percentage: ((eventStatus.upcoming / total) * 100).toFixed(0),
    },
    {
      title: "Completed Events",
      value: eventStatus.completed.toString(),
      bgGradient: "from-green-500 to-green-300",
      iconName: "CheckCircle",
      key: "completed-events",
      trend: eventStatus.completed > 0 ? "up" : "neutral",
      percentage: ((eventStatus.completed / total) * 100).toFixed(0),
    },
    {
      title: "Cancelled Events",
      value: eventStatus.cancelled.toString(),
      bgGradient: "from-red-500 to-red-300",
      iconName: "XCircle",
      key: "cancelled-events",
      trend: eventStatus.cancelled > 0 ? "down" : "neutral",
      percentage: ((eventStatus.cancelled / total) * 100).toFixed(0),
    },
  ];

  return (
    <div className="max-w-[1380px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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