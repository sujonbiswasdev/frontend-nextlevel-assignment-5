import { getSessionAction } from "@/actions/auth.actions"
import { getStatsAction } from "@/actions/stats.actions"
import DashboardContent from "@/components/dashbaord/DashboardContent"
import ErrorBoundary from "@/components/ErrorBoundary"
import ErrorFallback from "@/components/ErrorFallback"
import { DashboardData } from "@/types/stats.types"

export default async function DashboardPage() {
  const statsData=await getStatsAction()
  const userinfo=await getSessionAction()
  const role=userinfo.data?.role
  return (
    <div className="w-full">
     <ErrorBoundary fallback={<ErrorFallback title="Dashboard Error" message="An error occurred while loading your dashboard. Please refresh the page or try again later." />}>
       {statsData ? (
         <div>
           <DashboardContent role={role as string} eventVisivility={statsData.EventVisivillity} stats={statsData.data as DashboardData} />

         </div>
       ) : (
         <div className="text-red-600">Failed to load dashboard data. Please try again later.</div>
       )}
     </ErrorBoundary>
    </div>
  )
}