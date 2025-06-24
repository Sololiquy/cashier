"use client";

import React from "react";

interface parameterType {
   data: {
      receipt_data: any;
      paid_status: boolean;
      checkout_data: string;
   };
}

export default function Card({ data }: parameterType) {
   const status = data.paid_status ? "SUCCESS" : "PENDING";

   return (
      <>
         <div className={`flex flex-col p-3 gap-1 rounded-xl bg-gray-700`}>
            <div className={`flex flex-row gap-1`}>
               <div className={`${status === "SUCCESS" ? "bg-green-500" : "bg-red-500"} rounded-full px-2`}>{status}</div>
               <div>{data.paid_status}</div>
               <div>{data.checkout_data}</div>
            </div>
            <div className={`flex flex-col`}>
               {data.receipt_data.map((item: any) => (
                  <div key={item.product_id} className={`flex flex-row gap-2`}>
                     <div>{item.product_id}</div>
                     <div>x{item.quantity}</div>
                  </div>
               ))}
            </div>
         </div>
      </>
   );
}
