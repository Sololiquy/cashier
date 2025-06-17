import { NextResponse } from "next/server";

export async function POST(req: Request) {
   const { password } = await req.json();

   if (!password) {
      const response = NextResponse.json({ success: true });
      response.cookies.set("isAdmin", "false", {
         httpOnly: true,
         path: "/",
      });
      return response;
   }

   if (password === process.env.ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true });
      response.cookies.set("isAdmin", "true", {
         httpOnly: true,
         path: "/",
      });
      return response;
   }

   return NextResponse.json({ success: false }, { status: 401 });
}
