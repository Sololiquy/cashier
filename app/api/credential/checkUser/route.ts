import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
   const isAdmin = request.cookies.get("isAdmin")?.value === "true";
   return NextResponse.json({ isAdmin });
}
