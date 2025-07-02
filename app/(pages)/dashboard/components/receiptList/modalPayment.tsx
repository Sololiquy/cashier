"use client";
import React from "react";

import ProductCard from "./subcomponents/productCard";

interface parameterType {
   data: any;
   onClose: () => void;
   handlePay: (data: any) => void;
}

export default function Modal({ data, onClose, handlePay }: parameterType) {
   if (!data) return null;

   const date = data.checkout_date.split("T")[0];
   const time = data.checkout_date.split("T")[1].split(".")[0];

   return (
      <div className={`fixed inset-0 flex all-center z-50 bg-black bg-opacity-50`}>
         <div className={`w-full max-w-[400px] rounded-lg p-6 relative bg-gray-600 text-gray-100`}>
            <div className="w-full flex text-xl font-bold tracking-widest justify-center mb-3">Confirm Payment</div>
            <div className={`flex flex-col gap-3`}>
               <hr className={`w-full`} />
               <div className="flex flex-col gap-2 p-3 rounded-lg bg-gray-700">
                  {data.receipt_data.map((item: any) => (
                     <ProductCard key={item.product_id} data={item} />
                  ))}
               </div>
               <div className="flex flex-col gap-2 p-3 rounded-lg bg-gray-700">
                  <div className={`w-full flex flex-row`}>
                     <span className={`grow`}>Ordered time</span>
                     <span>
                        {date}, {time}
                     </span>
                  </div>
               </div>
               <hr className={`w-full`} />
            </div>

            <div className="mt-4 flex justify-end gap-2">
               <button onClick={onClose} className="bg-gray-700 px-4 py-2 rounded">
                  Cancel
               </button>
               <button onClick={() => handlePay(data)} className="bg-blue-600 text-white px-4 py-2 rounded">
                  Pay Now
               </button>
            </div>
         </div>
      </div>
   );
}
