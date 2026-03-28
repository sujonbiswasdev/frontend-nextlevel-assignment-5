import { Bell, Search } from "lucide-react"

export default function Navbar() {
  return (
    <header className="border-b border-white/10 bg-[#020617]">

      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between p-4 sm:px-6">

        <div className="flex items-center gap-3 bg-[#0F172A] px-3 py-2 rounded-lg">
          <Search size={16} />
          <input
            placeholder="Search..."
            className="bg-transparent outline-none text-sm"
          />
        </div>

        <div className="flex items-center gap-4">

          <Bell size={20} />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-500" />
            <span className="text-sm">John</span>
          </div>

        </div>

      </div>

    </header>
  )
}