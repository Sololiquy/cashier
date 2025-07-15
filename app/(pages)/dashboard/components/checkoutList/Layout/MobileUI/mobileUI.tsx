"use client";

import React, { useContext } from "react";

// import Card from "../../card";

// import style from "../../../dashboard.module.css";
import { contextModdingData } from "../../../../_context";

interface parameterType {
   handleSubmitCheckout: () => void;
}

export default function MobileUI({ handleSubmitCheckout }: parameterType) {
   const { checkout } = useContext(contextModdingData);
   const totalQuantity = checkout.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
   console.log(checkout);

   return (
      <>
         <div className={`absolute bottom-3 right-3 text-white`}>
            <button className={`rounded-full p-2 all-center bg-green-500 hover:bg-green-600 active:bg-green-700`} onClick={handleSubmitCheckout}>
               <img className={`size-12 object-cover`} src="/checkout.svg" alt="" />
            </button>
            <div className="absolute size-8 -top-3 -left-3 rounded-full flex all-center bg-red-500">{totalQuantity}</div>
         </div>
      </>
   );
}
