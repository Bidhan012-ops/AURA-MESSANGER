import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Manually check for the session cookie
  // On Vercel (HTTPS) it is '__Secure-authjs.session-token' or '__Secure-next-auth.session-token'
  // On Localhost it is 'authjs.session-token' or 'next-auth.session-token'
  const sessionToken = 
    request.cookies.get("__Secure-authjs.session-token")?.value ||
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value ||
    request.cookies.get("next-auth.session-token")?.value;
 console.log("The session is",sessionToken);
  const isLoggedIn = !!sessionToken;

  // 2. Auth Logic
  if (isLoggedIn && (pathname.startsWith("/signin") || pathname.startsWith("/signup"))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isLoggedIn && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup", "/dashboard/:path*"],
};