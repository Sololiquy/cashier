import { NextResponse } from "next/server";
import { getAllReceipt } from "@/utils/supabase/services";

export async function GET() {
   try {
      const receipt = await getAllReceipt();
      return NextResponse.json(receipt);
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}
