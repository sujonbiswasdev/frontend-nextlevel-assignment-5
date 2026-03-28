import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

const RootDashboardLayout = ({
  admin,
  user,
  children: _children,
}: {
  admin: React.ReactNode
  user: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '15rem',
          '--sidebar-width-mobile': '10rem',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="min-h-svh">
        <header className="flex h-12 shrink-0 items-center border-b">
          <div className="flex w-full max-w-[1440px] items-center gap-2 px-4 sm:px-6">
            <SidebarTrigger />
          </div>
        </header>
        <div className="flex min-h-0 flex-1 flex-col overflow-auto">
          <div className="flex w-full max-w-[1440px] min-w-0 flex-1 flex-col px-4 sm:px-6">
            {/* {admin} */}
            {user}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default RootDashboardLayout
