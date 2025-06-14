import { NextResponse } from "next/server";
import { updateProduct } from "@/utils/supabase/services";

export async function POST(req: Request) {
   try {
      const { product_id, price, availability } = await req.json();

      await updateProduct(product_id, price, availability);

      return NextResponse.json({ success: true }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
   }
}
