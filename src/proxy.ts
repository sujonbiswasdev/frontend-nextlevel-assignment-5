import { NextRequest, NextResponse } from "next/server";
import { getSessionAction } from "./actions/auth.actions";
import { jwtUtils } from "./lib/jwtUtils";

export type TUserRole = "USER" | "ADMIN";

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  try {

    const accessToken = request.cookies.get("accessToken")?.value;


    if (!accessToken) {
      return NextResponse.redirect(new URL("/login?You_are_not_logged_in,_please_log_in_first.", request.url));
    }

    const tokenVerify = jwtUtils.verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    console.log(tokenVerify,'ss')
    if (!tokenVerify.success) {
      return NextResponse.redirect(new URL("/login?Invalid_or_expired_access_token", request.url));
    }
    const userSession = await getSessionAction();
    if (!userSession?.success || !userSession?.data ||!tokenVerify) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const user = userSession.data || tokenVerify.data;
    if (user.status === "BLOCKED") {
      return NextResponse.redirect(new URL("/login?Your_account_is_blocked.please contact support", request.url));
    }
    const role = user.role as TUserRole;
    console.log(role,'s')
    if (pathname.startsWith("/admin")) {
      if (role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login?Access_denied_Admins_only", request.url));
      }
    }

    if (pathname.startsWith("/payment")) {
      if (role !== "ADMIN" && role !== "USER") {
        return NextResponse.redirect(new URL("/login?Access_denied_Only_users_and_admins_can_access_payment_routes.", request.url));
      }
    }

    if (pathname.startsWith("/user")) {
      if (role !== "USER") {
        return NextResponse.redirect(new URL("/login?Access_denied_Only_users.", request.url));
      }
    }

    if (pathname.startsWith("/dashboard")) {

      if (role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } else if (role === "USER") {
        return NextResponse.redirect(new URL("/user/dashboard", request.url));
      }
    }

    if (pathname === "/user") {
      return NextResponse.redirect(new URL("/user/dashboard", request.url));
    }
    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return NextResponse.redirect(new URL("/login?Something_went_wrong_while_verifying_authentication", request.url));
  }
};

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/dashboard/:path*","/payment/:path*"],
};