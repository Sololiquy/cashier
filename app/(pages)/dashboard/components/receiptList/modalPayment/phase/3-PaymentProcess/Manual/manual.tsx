"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import KeyboardModal from "@/app/global/components/keyboardUI/keyboardUI";

interface parameterType {
   total_price: number;
   payTotal: number;
   setPayTotal: Dispatch<SetStateAction<number>>;
}

export default function Manual({ total_price, payTotal, setPayTotal }: parameterType) {
   const [showKeyboard, setShowKeyboard] = useState<boolean>(false);

   return (
      <>
         <div className={`flex flex-col gap-3`}>
            <div className={`flex flex-col gap-2 p-3 rounded-lg bg-gray-700`}>
               <div className={`w-full flex flex-row`}>
                  <span className={`grow`}>Total</span>
                  <span>Rp {total_price}</span>
               </div>
            </div>
            <div className={`flex flex-col gap-2 p-3 rounded-lg bg-gray-700`}>
               <div className={`w-full flex flex-row items-center cursor-pointer`} onClick={() => setShowKeyboard(true)}>
                  <span className={`grow`}>Pay</span>
                  <div className={`bg-gray-800 px-2 py-1 rounded text-white w-32 text-right`}>Rp {payTotal}</div>
               </div>
            </div>
         </div>

         {showKeyboard && <KeyboardModal initialValue={payTotal} onClose={() => setShowKeyboard(false)} onConfirm={(val) => setPayTotal(val)} />}
      </>
   );
}
