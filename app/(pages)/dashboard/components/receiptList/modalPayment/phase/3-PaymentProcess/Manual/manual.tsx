"use client";

import React, { Dispatch, SetStateAction } from "react";

interface parameterType {
   total_price: number;
   payTotal: number;
   setPayTotal: Dispatch<SetStateAction<number>>;
}

export default function Manual({ total_price, payTotal, setPayTotal }: parameterType) {
   return (
      <div className={`flex flex-col gap-3`}>
         <div className={`flex flex-col gap-2 p-3 rounded-lg bg-gray-700`}>
            <div className={`w-full flex flex-row`}>
               <span className={`grow`}>Total</span>
               <span>Rp {total_price}</span>
            </div>
         </div>
         <div className={`flex flex-col gap-2 p-3 rounded-lg bg-gray-700`}>
            <div className={`w-full flex flex-row items-center`}>
               <span className={`grow`}>Pay</span>
               <input
                  type="number"
                  value={payTotal}
                  onChange={(e) => setPayTotal(Number(e.target.value))}
                  className={`bg-gray-800 px-2 py-1 rounded text-white w-32 text-right`}
               />
            </div>
         </div>
      </div>
   );
}
