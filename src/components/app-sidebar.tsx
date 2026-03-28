import { getSessionAction } from "@/actions/auth.actions"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import { getDefaultDashboardRoute } from "@/lib/authUtils"
import { getNavItemsByRole } from "@/routes/sidebar.navitems"
import { NavSection } from "@/types/dashboard.types"
import DashboardSidebarContent from "./dashbaord/DashboardSidebarContent"
  
  export async function AppSidebar() {
    const userInfo = await getSessionAction()
  const navItems : NavSection[] = getNavItemsByRole(userInfo.data.role)

  const dashboardHome = getDefaultDashboardRoute(userInfo.data.role)
    return (
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
         <SidebarGroup>
         <DashboardSidebarContent userInfo={userInfo.data} navItems={navItems} dashboardHome={dashboardHome}/>
         </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }