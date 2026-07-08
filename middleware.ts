import { NextResponse } from "next/server";
import { auth } from "@/app/api/auth/[...nextauth]/option";

export default auth((request) => {
  const token = request.auth;
  const { pathname } = request.nextUrl;
  
  console.log("Middleware token:", token ? "Found" : "Null");
  console.log("Middleware pathname:", pathname);
  
  if (token && (pathname.startsWith("/login") || pathname.startsWith("/signin") || pathname.startsWith("/signup"))) {
    console.log("Redirecting to dashboard from middleware");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next();
});
export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/dashboard/:path*',
    '/getmessages/:path*'
  ],
};