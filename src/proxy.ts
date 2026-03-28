import { NextRequest, NextResponse } from "next/server";
import { getSessionAction } from "./actions/auth.actions";
import { jwtUtils } from "./lib/jwtUtils";

export type TUserRole = "USER" | "ADMIN";

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  try {

    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: "You are not logged in, please log in first." },
        { status: 401 }
      );
    }

    const tokenVerify = jwtUtils.verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    );

    if (!tokenVerify.success) {
      return NextResponse.json(
        { error: "Invalid or expired access token." },
        { status: 401 }
      );
    }


    const userSession = await getSessionAction();
    if (!userSession?.success || !userSession?.data) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const user = userSession.data;


    if (user.status === "BLOCKED") {
      return NextResponse.json(
        { error: "Your account is blocked. Contact support." },
        { status: 403 }
      );
    }

    const role = user.role as TUserRole;

    if (pathname.startsWith("/admin")) {
      if (role !== "ADMIN") {
        return NextResponse.json(
          { error: "Access denied. Admins only." },
          { status: 403 }
        );
      }
    }

    if (pathname.startsWith("/user")) {
      if (role !== "USER") {
        return NextResponse.json(
          { error: "Access denied. Users only." },
          { status: 403 }
        );
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
    return NextResponse.json(
      { error: "Something went wrong while verifying authentication." },
      { status: 500 }
    );
  }
};

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/dashboard/:path*"],
};