export type UserRole = "USER" | "ADMIN" ;
export const getDefaultDashboardRoute = (role : UserRole) => {
    if(role === "ADMIN") {
        return "/admin/dashboard";
    }
    if(role === "USER") {
        return "/user/dashboard";
    }
    return "/";
}