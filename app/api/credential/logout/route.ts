import { NextResponse } from "next/server";

export async function POST() {
   const res = NextResponse.json({ success: true });

   res.cookies.set("isAdmin", "", { path: "/", expires: new Date(0) });
   res.cookies.set("isGuest", "", { path: "/", expires: new Date(0) });

   return res;
}
