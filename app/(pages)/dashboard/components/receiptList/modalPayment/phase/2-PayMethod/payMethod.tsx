"use client";

import React, { Dispatch, SetStateAction } from "react";

interface parameterType {
   paymentMethod: number | null;
   setPaymentMethod: Dispatch<SetStateAction<number | null>>;
}

export default function PayMethod({ paymentMethod, setPaymentMethod }: parameterType) {
   return (
      <>
         <div className={`flex flex-col gap-3`}>
            <label className={`flex p-3 gap-3 rounded-lg bg-gray-700 items-center`}>
               <input className={`size-3`} type="radio" name="payment" value="1" checked={paymentMethod === 1} onChange={() => setPaymentMethod(1)} />
               <span className={`text-xl tracking-wider`}>Cash</span>
            </label>

            <label className={`flex p-3 gap-3 rounded-lg bg-gray-700 items-center`}>
               <input className={`size-3`} type="radio" name="payment" value="2" checked={paymentMethod === 2} onChange={() => setPaymentMethod(2)} />
               <span className={`text-xl tracking-wider grow`}>QRIS</span>
               <div className="w-20 overflow-hidden">
                  <img className={`w-full h-full object-contain`} src="/paymentMethod/QRIS.svg" alt="" />
               </div>
            </label>
         </div>
      </>
   );
}
