import { NextResponse } from "next/server";
import { paymentManual } from "@/utils/supabase/services";

export async function POST(req: Request) {
   try {
      const { checkout_date, payTotal } = await req.json();

      const data = await paymentManual(checkout_date, payTotal);

      return NextResponse.json(data, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
   }
}
