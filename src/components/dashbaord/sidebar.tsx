import { LayoutDashboard, Users, BarChart3, CreditCard, Settings } from "lucide-react"

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-white/10 bg-[#020617] p-6">

      <h2 className="text-xl font-semibold mb-8">
        Dashboard X
      </h2>

      <nav className="space-y-4 text-sm">

        <a className="flex items-center gap-3 hover:text-purple-400">
          <LayoutDashboard size={18} />
          Dashboard
        </a>

        <a className="flex items-center gap-3 hover:text-purple-400">
          <Users size={18} />
          Users
        </a>

        <a className="flex items-center gap-3 hover:text-purple-400">
          <BarChart3 size={18} />
          Analytics
        </a>

        <a className="flex items-center gap-3 hover:text-purple-400">
          <CreditCard size={18} />
          Payments
        </a>

        <a className="flex items-center gap-3 hover:text-purple-400">
          <Settings size={18} />
          Settings
        </a>

      </nav>

    </aside>
  )
}