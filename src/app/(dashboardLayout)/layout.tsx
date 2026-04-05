import { getSessionAction } from '@/actions/auth.actions'
import { AppSidebar } from '@/components/app-sidebar'
import ErrorBoundary from '@/components/ErrorBoundary'
import ErrorFallback from '@/components/ErrorFallback'
import { NavbarNotifications } from '@/components/module/notification/Notification'
import ProfileCard from '@/components/module/user/ProfileCard'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { IBaseUser } from '@/types/user.types'
import React from 'react'

// Responsive Sidebar Layout covering all device sizes
const RootDashboardLayout = async ({
  admin,
  user,
  children,
}: {
  admin: React.ReactNode
  user: React.ReactNode
  children: React.ReactNode
}) => {
  const userInfo = await getSessionAction();

  if (!userInfo || !userInfo.data || !userInfo.success) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white dark:bg-gray-900 px-8 py-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
          <h2 className="font-semibold text-lg mb-2 text-red-500">Authentication Error</h2>
          <p className="text-gray-700 dark:text-gray-300">You must be signed in to view the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      {/* Sidebar Provider sets CSS variable for sidebar width and makes the sidebar responsive */}
      <SidebarProvider
        style={
          {
            '--sidebar-width': '14rem',
            '--sidebar-width-mobile': '4.2rem',
          } as React.CSSProperties
        }
      >
        {/* Sidebar: fixed on large screens, collapsible on small */}
        <AppSidebar />

        <main className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out">
          {/* HEADER */}
          <header className="
            sticky top-0 z-30 w-full bg-white/80 dark:bg-gray-950/70
            border-b border-gray-200 dark:border-gray-800
            backdrop-blur-md shadow-sm
            flex flex-col
          ">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-2 min-h-[56px] sm:px-5 lg:px-8">
              {/* Sidebar button, always visible for mobile & tablet */}
              <div className="flex shrink-0 items-center gap-3 min-w-10">
                <SidebarTrigger />
              </div>
              {/* App search — same horizontal band as main content (middle-aligned column) */}
              <div className="flex min-w-0 flex-1 justify-center px-1">
                <div className="relative w-full max-w-md">
                  <input
                    type="search"
                    aria-label="System search"
                    placeholder="Search dashboard…"
                    className="
                      block w-full px-5 md:px-10 py-2 md:py-3 rounded-2xl
                      border border-transparent bg-gray-100 dark:bg-gray-900/70
                      backdrop-blur-lg shadow-lg placeholder-gray-400 dark:placeholder-gray-500
                      text-sm md:text-base
                      focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700
                      transition
                    "
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              {/* User actions: notification + avatar (right-aligned) */}
              <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3 min-w-10">
                <div className="mt-1 sm:mt-2">
                  <NavbarNotifications />
                </div>
                <ProfileCard profile={userInfo.data as IBaseUser} />
              </div>
            </div>
          </header>

          {/* CONTENT — same max width + horizontal padding as header (middle-aligned column) */}
          <SidebarInset className="flex min-h-0 flex-1 flex-col overflow-auto">
            <div
              className="
              w-full md:max-w-[800px] lg:max-w-[1050px] xl:max-w-[1300px] 2xl:max-w-[1440px] mx-auto
              "
              data-dashboard-search-zone
            >
              <ErrorBoundary fallback={<ErrorFallback title="Dashboard Load Failed" message="Something went wrong while loading the dashboard." />}>
                {userInfo.data?.role==='ADMIN' ? admin : user}
              </ErrorBoundary>
            </div>
          </SidebarInset>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default RootDashboardLayout
