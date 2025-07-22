"use client";

import React, { useContext, useState } from "react";

import CheckoutModal from "./checkoutModal";

import { contextModdingData } from "../../../../_context";

interface parameterType {
   handleSubmitCheckout: () => void;
}

export default function MobileUI({ handleSubmitCheckout }: parameterType) {
   const { checkout } = useContext(contextModdingData);
   const [openCheckoutModal, setOpenCheckoutModal] = useState<boolean>(false);

   const totalQuantity = checkout.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);

   return (
      <>
         <div className={`absolute bottom-3 right-3 text-white`}>
            <button
               disabled={checkout.length === 0}
               className={`rounded-full p-2 all-center ${
                  checkout.length === 0 ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 active:bg-green-700"
               }`}
               onClick={() => setOpenCheckoutModal(true)}
            >
               <img className={`size-12 object-cover`} src="/checkout.svg" alt="" />
            </button>
            {totalQuantity > 0 && <div className={`absolute size-8 -top-3 -left-3 rounded-full flex all-center bg-red-500`}>{totalQuantity}</div>}
         </div>
         {openCheckoutModal && <CheckoutModal setOpenCheckoutModal={setOpenCheckoutModal} handleSubmitCheckout={handleSubmitCheckout} />}
      </>
   );
}
