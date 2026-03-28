

import ActivityTable from "@/components/dashbaord/activity-table"
import AnalyticsCard from "@/components/dashbaord/analytics-card"
import StatCard from "@/components/dashbaord/stat-card"
import { Users, DollarSign, Activity, BarChart } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-2xl font-semibold">
          Welcome back, John
        </h1>
        <p className="text-gray-400 text-sm">
          Monitor your dashboard analytics
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard title="Total Users" value="23.6K" icon={<Users />} />
        <StatCard title="Revenue" value="$240K" icon={<DollarSign />} />
        <StatCard title="Active Users" value="756" icon={<Activity />} />
        <StatCard title="Subscriptions" value="2.3K" icon={<BarChart />} />

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <AnalyticsCard/>
        </div>

        <div>
          <ActivityTable />
        </div>

      </div>

    </div>
  )
}