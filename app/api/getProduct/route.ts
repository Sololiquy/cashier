import { NextResponse } from "next/server";
import { getProduct } from "@/utils/supabase/services";

export async function POST(req: Request) {
   try {
      const { productID } = await req.json();

      const data = await getProduct(productID);
      return NextResponse.json(data, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
   }
}
