"use client";

import React from "react";

import Manual from "./Manual/manual";
import QRIS from "./QRIS/QRIS";

interface parameterType {
   paymentMethod: number | null;
}

export default function PaymentProcess({ paymentMethod }: parameterType) {
   return (
      <>
         <div className={`flex flex-col gap-3`}>
            {paymentMethod === 1 && <Manual />}
            {paymentMethod === 2 && <QRIS />}
         </div>
      </>
   );
}
