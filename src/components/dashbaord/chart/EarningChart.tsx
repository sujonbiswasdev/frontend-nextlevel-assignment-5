
import React from 'react'
import Curve from './Curve'
import { StatsCounts } from '../DashboardContent'
import { Users } from 'lucide-react'
import { monthlyRevenue } from '../DashboardBarChart'
import { MonthlyRevenue } from '@/types/stats.types'
import PieChart from './PieChart'
const CurveChart = ({stats}:{stats:MonthlyRevenue[]}) => {
  return (
    <div className='p-4 h-full'>
        <div className="mb-2 font-semibold text-lg text-primary flex items-center gap-2">
          Earnings Insights 
        </div>
        <div className='p-4 h-full'>
                    <Curve stats={stats as MonthlyRevenue[]} />
        </div>
    </div>
    )
}
export { CurveChart }

interface EarningRateProps {
  earningRate: number;
  earningRateLastMonth: number;
}

const EarningRate: React.FC<EarningRateProps> = ({
  earningRate,
  earningRateLastMonth,
}) => {
  const percentageChange =
    earningRateLastMonth === 0
      ? 0
      : ((earningRate - earningRateLastMonth) / Math.abs(earningRateLastMonth)) * 100;

  const isProfitUp = percentageChange >= 0;
  const formattedChange = Math.abs(percentageChange).toFixed(2);

  return (
    <div className="p-6 h-full bg-white rounded-lg shadow-xl flex flex-col justify-between">
      <div>
        <h2 className="text-blue-700 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-1">
          {earningRate.toLocaleString()} <span className="text-base font-medium text-slate-500">taka</span>
        </h2>
        <span
          className={`inline-flex items-center text-xs md:text-sm font-semibold mb-2 ${
            isProfitUp ? "text-green-600" : "text-red-500"
          }`}
        >
          <svg
            className={`w-4 h-4 mr-1 ${
              isProfitUp ? "" : "rotate-180"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isProfitUp ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"}
            />
          </svg>
          {isProfitUp ? "Higher" : "Lower"} by {formattedChange}% than last month
        </span>
        <p className="text-slate-500 text-xs md:text-sm">
          Compared to last month&#39;s earnings of <strong>{earningRateLastMonth.toLocaleString()} taka</strong>
        </p>
      </div>

      <div className="w-full flex items-center justify-center mx-auto mt-4">
        {/* For PieChart, percentage value is 0-100, so make sure to provide a sensible value here */}
        <PieChart percentage={Math.min(Math.max(Number(((earningRate / (earningRateLastMonth || 1)) * 100).toFixed(0)), 0), 100)} />
      </div>
    </div>
  );
};

const Earnings =({stats,earningRate}:{stats:MonthlyRevenue[],earningRate:number})=>{
    return(
        <div className='grid lg:grid-cols-3 grid-cols-1 px-4 pb-4 lg:gap-x-4 gap-y-4'>
            <div className='bg-primary2 rounded-md min-w-full'>
                <EarningRate earningRate={earningRate} earningRateLastMonth={stats[11].revenue}/>
            </div>
            <div className='col-span-2 bg-primary2 rounded-md h-full '>
                <CurveChart stats={stats as MonthlyRevenue[]} />
            </div>

        </div>
    )
}
export default Earnings