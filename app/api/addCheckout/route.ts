import { NextRequest, NextResponse } from "next/server";
import { addCheckout } from "@/utils/supabase/services";

export async function POST(req: NextRequest) {
   try {
      const { checkout, total } = await req.json();

      checkout.forEach((item: any) => {
         ["category", "imageURL", "url_image", "name", "availability"].forEach((key) => delete item[key]);
      });
      await addCheckout(checkout, total);

      return NextResponse.json({ message: "Checkout successful" }, { status: 200 });
   } catch (error) {
      console.error("Checkout error:", error);
      return NextResponse.json({ error: "Failed to checkout" }, { status: 500 });
   }
}
