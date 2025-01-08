import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("auth-token");
  const url = req.nextUrl;

  // Unprotected routes
  const publicRoutes = ["/login", "/register"];
  if (publicRoutes.includes(url.pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // Protect admin-only routes
    if (url.pathname.startsWith("/dashboard/admin") && user.role !== "Admin") {
      return NextResponse.redirect(new URL("/dashboard/user", req.url));
    }

    req.user = user;
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
