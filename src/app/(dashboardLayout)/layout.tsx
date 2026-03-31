import { getSessionAction } from '@/actions/auth.actions'
import { AppSidebar } from '@/components/app-sidebar'
import ProfileCard from '@/components/shared/ProfileCard'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { IBaseUser } from '@/types/user.types'
import React, { Suspense } from 'react'

// Move the Search Input component to a Client Component to avoid server-side event handler error.
const DashboardSearchInput = () => {
  // --- Mark as client component ---
  // eslint-disable-next-line react-hooks/rules-of-hooks
  if (typeof window === 'undefined') return null;
  // simple force update for reactivity - not strictly needed here!

  return (
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        placeholder="Search anything…"
        className="block w-full rounded-full border border-yellow-400 bg-yellow-50 px-4 py-2 pl-12 text-sm text-gray-900 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 transition dark:bg-gray-900 dark:text-gray-100 dark:border-yellow-700"
        aria-label="Search"
        onChange={async (e) => {
          const query = e.target.value.trim().toLowerCase();

          // Clear previous highlights
          document.querySelectorAll('.dashboard-search-highlight').forEach((el) => {
            el.classList.remove('dashboard-search-highlight');
          });

          if (!query) return;

          // Helper function to walk the DOM and highlight matches
          function highlightTextNodes(node: any) {
            if (node.nodeType === 3 && node.nodeValue?.trim()) {
              const idx = node.nodeValue.toLowerCase().indexOf(query);
              if (idx !== -1) {
                const span = document.createElement('span');
                span.className = 'dashboard-search-highlight';
                span.style.backgroundColor = '#fde047'; // yellow-300
                span.style.color = '#b45309'; // yellow-700
                span.textContent = node.nodeValue.substring(idx, idx + query.length);

                const after = node.splitText(idx + query.length);
                const match = node.splitText(idx);
                match.parentNode?.insertBefore(span, after);
                match.parentNode?.removeChild(match);
              }
              return;
            } else if (
              node.nodeType === 1 &&
              !(node as HTMLElement).classList.contains('dashboard-search-highlight')
            ) {
              for (const child of Array.from(node.childNodes)) {
                highlightTextNodes(child);
              }
            }
          }

          // Search in the main app content (not sidebar/header)
          const mainArea = document.querySelector('[data-dashboard-search-zone]') || document.body;
          highlightTextNodes(mainArea);
        }}
      />
      <style>{`
        .dashboard-search-highlight {
          background: #fde047 !important;
          color: #b45309 !important;
          border-radius: .2em;
          padding: 0 0.1em;
          font-weight: bold;
        }
      `}</style>
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
  );
};

const RootDashboardLayout = async ({
  admin,
  user,
  children: _children,
}: {
  admin: React.ReactNode
  user: React.ReactNode
  children: React.ReactNode
}) => {
  const userinfo = await getSessionAction();
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
      <SidebarInset className="min-h-8">
        <header className="w-full border-b bg-white shadow-sm dark:bg-gray-950 sticky top-0 z-40">
          <div className="flex items-center justify-between gap-4 px-2 sm:px-6 py-2 w-full max-w-full mx-auto min-h-[56px]">
            {/* Sidebar Button + Optional Logo */}
            <div className="flex items-center gap-3 min-w-[2.5rem]">
              <SidebarTrigger />
            </div>



            {/* Unique Professional Input Field - Glass Morphism, Modern Glow, and Animated Icon */}
            <div className="flex-1 flex justify-center w-full">
              <div className="relative w-full max-w-lg select-none">
                <input
                  type="search"
                  id="unique-pro-search"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="System search"
                  placeholder="Type to search across all dashboards…"
                  className="peer w-full px-12 py-3 rounded-2xl border border-transparent bg-white/70 dark:bg-gray-900/70 backdrop-blur-md focus:bg-white dark:focus:bg-gray-950 focus:border-blue-500 ring-2 ring-transparent focus:ring-blue-400/60 focus:outline-none shadow-lg placeholder-gray-400 dark:placeholder-gray-600 text-lg transition-all duration-300 ease-out hover:shadow-xl"
                  style={{
                    boxShadow: '0 2px 32px 0 rgba(74,122,255,0.07)'
                  }}
                />
                {/* Unique animated search icon and colorful accent bar */}
                <span className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 peer-focus:-rotate-6 peer-focus:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-blue-400 drop-shadow-[0_1px_4px_rgba(74,122,255,0.25)] motion-safe:animate-pulse peer-focus:text-blue-500"
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
                <span className="absolute bottom-0 left-10 right-8 h-1 rounded-xl bg-gradient-to-r from-blue-400 via-fuchsia-500 to-emerald-400 opacity-60 pointer-events-none transition-all scale-x-0 peer-focus:scale-x-100 peer-focus:opacity-100 duration-300 origin-left" />
              </div>
            </div>

            {/* Profile Avatar / User Actions -- ProfileCard now opens on click rather than always being open */}
            <div className="flex items-center gap-3 min-w-[2.5rem] justify-end">
              <ProfileCard profile={userinfo.data as IBaseUser} />
            </div>
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
  );
};

export default RootDashboardLayout
