"use client";
import React from "react";

interface parameterType {
   receipt: any;
   onClose: () => void;
   handlePay: (receipt: any) => void;
}

export default function Modal({ receipt, onClose, handlePay }: parameterType) {
   if (!receipt) return null;

   const date = receipt.checkout_date.split("T")[0];
   // const time = receipt.checkout_date.split("T")[1];

   return (
      <div className={`fixed inset-0 flex all-center z-50 bg-black bg-opacity-50`}>
         <div className={`w-full max-w-md mx-4 rounded-lg p-6 relative bg-white text-black`}>
            <h2 className="text-xl font-bold mb-2">Confirm Payment</h2>
            <p>
               Pay for: <strong>{date}</strong>?
            </p>

            <div className="mt-4 flex justify-end gap-2">
               <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
                  Cancel
               </button>
               <button onClick={() => handlePay(receipt)} className="bg-blue-600 text-white px-4 py-2 rounded">
                  Pay Now
               </button>
            </div>
         </div>
      </div>
   );
}
