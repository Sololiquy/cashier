"use client";

import React, { useContext } from "react";

import Card from "./card";

import style from "../../../../dashboard.module.css";
import { contextModdingData } from "../../../../_context";

interface parameterType {
   setOpenCheckoutModal: (open: boolean) => void;
   handleSubmitCheckout: () => void;
}

export default function CheckoutModal({ setOpenCheckoutModal, handleSubmitCheckout }: parameterType) {
   const { total, checkout } = useContext(contextModdingData);

   const submit = async () => {
      await handleSubmitCheckout();
      setOpenCheckoutModal(false);
   };
   return (
      <>
         <div className={`fixed inset-0 flex flex-col  z-50 bg-gray-700`}>
            <div className={`flex flex-col p-2 gap-2 grow`}>
               <div className={`gap-3 flex flex-row`}>
                  <div className={`${style.tab_image} !h-auto`}></div>
                  <div className={`${style.tab_info} text-gray-400 text-2xl`}>Info</div>
                  <div className={`${style.tab_qty} text-gray-400 text-2xl`}>Qty</div>
                  <div className={`${style.tab_total} text-gray-400 text-2xl`}>Total</div>
               </div>
               {checkout.map((item: any) => (
                  <Card key={item.product_id} data={item} />
               ))}
            </div>
            <hr />
            <div className="flex justify-end text-3xl">Rp. {total}</div>
            <div className={`flex flex-row p-3 gap-3 justify-end`}>
               <button
                  className="flex p-2 text-2xl rounded-lg bg-red-500 hover:bg-red-600 active:bg-red-700"
                  onClick={() => setOpenCheckoutModal(false)}
               >
                  Back
               </button>
               <button className="flex p-2 text-2xl rounded-lg bg-green-500 hover:bg-green-600 active:bg-green-700" onClick={submit}>
                  Checkout
               </button>
            </div>
         </div>
      </>
   );
}
