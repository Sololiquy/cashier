"use client";

import React, { useContext } from "react";

import Card from "./card";

import style from "../../dashboard.module.css";
import { contextModdingData } from "../../context";

export default function CheckoutList() {
   const { total, checkout } = useContext(contextModdingData);

   const handleSubmitCheckout = async () => {
      try {
         const res = await fetch("/api/addCheckout", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ checkout, total }),
         });

         const result = await res.json();

         if (res.ok) {
            alert("Checkout successful!");
         } else {
            alert("Checkout failed: " + result.error);
         }
      } catch (err) {
         console.error("Checkout error", err);
         alert("Checkout error: " + err);
      }
   };

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
                  <Card key={item.product_id} data={item} />
               ))}
            </div>
            <hr />
            <div className="flex justify-end text-xl">Rp. {total}</div>
            <button className={`px-4 py-2 text-white rounded bg-green-500 hover:bg-green-600 active:bg-green-700`} onClick={handleSubmitCheckout}>
               CHECKOUT
            </button>
         </div>
      </>
   );
}
