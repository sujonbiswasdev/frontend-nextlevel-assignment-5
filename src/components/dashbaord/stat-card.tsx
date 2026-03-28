import { ReactNode } from "react"

type Props = {
  title: string
  value: string
  icon: ReactNode
}

export default function StatCard({ title, value, icon }: Props) {
  return (
    <div className="bg-[#0F172A] border border-white/10 rounded-xl p-6 flex justify-between items-center">

      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-semibold">{value}</h3>
      </div>

      <div className="text-purple-400">
        {icon}
      </div>

    </div>
  )
}