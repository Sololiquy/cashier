"use client";

import React, { Dispatch, SetStateAction } from "react";

import Manual from "./Manual/manual";
import QRIS from "./QRIS/QRIS";

interface parameterType {
   total_price: number;
   paymentMethod: number | null;
   payTotal: number;
   setPayTotal: Dispatch<SetStateAction<number>>;
}

export default function PaymentProcess({ total_price, paymentMethod, payTotal, setPayTotal }: parameterType) {
   return (
      <>
         <div className={`flex flex-col gap-3`}>
            {paymentMethod === 1 && <Manual total_price={total_price} payTotal={payTotal} setPayTotal={setPayTotal} />}
            {paymentMethod === 2 && <QRIS />}
         </div>
      </>
   );
}
