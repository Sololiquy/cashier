"use client";

import React, { useContext } from "react";

import Card from "./card";

import style from "../../dashboard.module.css";
import { contextModdingData } from "../../context";

export default function CheckoutList() {
   const { total, checkout } = useContext(contextModdingData);

   return (
      <>
         <div className="w-full m-2 mt-0 gap-3 flex flex-col">
            <div className=" p-2 gap-2 flex flex-col grow">
               <div className={`gap-3 flex flex-row`}>
                  <div className={`${style.tab_image} !h-auto`}></div>
                  <div className={`${style.tab_info} text-gray-400 text-sm`}>Info</div>
                  <div className={`${style.tab_qty} text-gray-400 text-sm`}>Qty</div>
                  <div className={`${style.tab_total} text-gray-400 text-sm`}>Total</div>
               </div>
               {checkout.map((item: any) => (
                  <Card key={item.barcode_id} data={item} />
               ))}
            </div>
            <hr />
            <div className="flex justify-end text-xl">Rp. {total}</div>
            <button className={`px-4 py-2  text-white rounded bg-green-500 hover:bg-green-600 active:bg-green-700`}>CHECKOUT</button>
         </div>
      </>
   );
}
