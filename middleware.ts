import { NextRequest,NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request:NextRequest){
   const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
   const { pathname } = request.nextUrl;
   console.log("Middleware token:", token);
   console.log("Middleware pathname:", pathname);
   if(token && (pathname.startsWith("/login") || pathname.startsWith("/signup"))){
    console.log("Redirecting to dashboard from middleware");
    return NextResponse.redirect(new URL("/dashboard",request.url));
   }
    if(!token && pathname.startsWith("/dashboard")){
    return NextResponse.redirect(new URL("/signin",request.url));
   }
}
export const config = {
    matcher: [
      '/signin',
      '/signup',
      '/dashboard/:path*',
      '/getmessages/:path*'
    ],
  };