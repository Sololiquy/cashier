import { NextResponse } from "next/server";
import { getAllProduct } from "@/utils/supabase/services";

export async function GET() {
   try {
      const products = await getAllProduct();
      return NextResponse.json(products);
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}
