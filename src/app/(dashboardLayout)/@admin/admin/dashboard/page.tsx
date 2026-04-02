import { getStatsAction } from '@/actions/stats.actions'
import DashboardContent from '@/components/dashbaord/DashboardContent'
import ErrorBoundary from '@/components/ErrorBoundary'
import { DashboardData, MonthlyRevenue } from '@/types/stats.types'
import React from 'react'

const Page = async() => {
  const statsData=await getStatsAction()
  return (
    <ErrorBoundary fallback={<div className="text-red-600">An error occurred while loading the admin dashboard. Please refresh the page or try again later.</div>}>
       {statsData ? (
         <div>
            <DashboardContent stats={statsData.data as DashboardData<{ monthlyRevenue: any[]; eventStatus: any; pieChartData: any[]; barChartData: any[] }>} />

         </div>
       ) : (
         <div className="text-red-600">Failed to load dashboard data. Please try again later.</div>
       )}
    </ErrorBoundary>
  )
}

export default Page