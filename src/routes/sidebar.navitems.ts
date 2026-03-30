

import { getDefaultDashboardRoute, UserRole } from "@/lib/authUtils";
import { NavSection } from "@/types/dashboard.types";



export const getCommonNavItems = (role : UserRole) : NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);
    return [
        {
            items : [
                {
                    title : "Home",
                    href : "/",
                    icon : "Home"
                },
                {
                    title : "Dashboard",
                    href : defaultDashboard,
                    icon : "LayoutDashboard"

                }
            ]
        }
    ]
}


export const UserNavItems : NavSection[] = [
    {
        title: "Event Management",
        items: [
            {
                title: "My-Events",
                href: "/user/dashboard/my-events",
                icon: "Calendar"
            },
            {
                title: "Create Event",
                href: "/user/dashboard/create-event",
                icon: "PlusSquare"
            },
            {
                title: "Invitations",
                href: "/user/dashboard/invitations",
                icon: "Mail"
            }
        ]
    },
    {
        title: "User Management",
        items: [
            {
                title: "My Participant",
                href: "/user/dashboard/my-participant",
                icon: "Users"
            },
            {
                title: "My Reviews",
                href: "/user/dashboard/my-reviews",
                icon: "Star"
            },
            {
                title: "Settings",
                href: "/user/dashboard/setting",
                icon: "Settings"
            }
        ]
    }
]



export const adminNavItems: NavSection[] = [
    {
        title: "Event Management",
        items: [
            {
                title: "Categories",
                href: "/admin/dashboard/categories",
                icon: "LayoutGrid"
            },
            {
                title: "Events",
                href: "/admin/dashboard/events",
                icon: "Calendar"
            },
            {
                title: "Invitations",
                href: "/admin/dashboard/invitations",
                icon: "Mail"
            }
        ]
    },
    {
        title: "User Management",
        items: [
            {
                title: "Users",
                href: "/admin/dashboard/users",
                icon: "UserCog"
            },
            {
                title: "Participants",
                href: "/admin/dashboard/participants",
                icon: "Users"
            },
            {
                title: "Reviews",
                href: "/admin/dashboard/reviews",
                icon: "Star"
            }
        ]
    },
    {
        title: "System",
        items: [
            {
                title: "Payment",
                href: "/admin/dashboard/payment",
                icon: "CreditCard"
            },
            {
                title: "Settings",
                href: "/admin/dashboard/setting",
                icon: "Settings"
            }
        ]
    }
]


export const getNavItemsByRole = (role : UserRole) : NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];

        case "USER":
            return [...commonNavItems, ...UserNavItems];
    }


}