import { getStatsAction } from "@/actions/stats.actions"
import DashboardContent from "@/components/dashbaord/DashboardContent"
import ErrorBoundary from "@/components/ErrorBoundary"
import ErrorFallback from "@/components/ErrorFallback"
import { DashboardData, MonthlyRevenue } from "@/types/stats.types"

export default async function DashboardPage() {
  const statsData=await getStatsAction()
  return (
    <div className="p-6">
     <ErrorBoundary fallback={<ErrorFallback title="Dashboard Error" message="An error occurred while loading your dashboard. Please refresh the page or try again later." />}>
       {statsData ? (
         <div>
          <DashboardContent stats={statsData.data as DashboardData<{ monthlyRevenue: any[]; eventStatus: any; pieChartData: any[]; barChartData: any[] }>} />

         </div>
       ) : (
         <div className="text-red-600">Failed to load dashboard data. Please try again later.</div>
       )}
     </ErrorBoundary>
    </div>
  )
}