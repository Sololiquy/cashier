import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
   const isAdmin = request.cookies.get("isAdmin")?.value;
   const isGuest = request.cookies.get("isGuest")?.value;

   const isLoggedIn = isAdmin || isGuest;

   if (!isLoggedIn && request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: ["/dashboard/:path*"],
};
