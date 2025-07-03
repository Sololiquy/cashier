"use client";

import React from "react";

import ProductCard from "./productCard";

interface parameterType {
   data: any;
}

export default function ReceiptDetail({ data }: parameterType) {
   const date = data.checkout_date.split("T")[0];
   const time = data.checkout_date.split("T")[1].split(".")[0];
   return (
      <>
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
      </>
   );
}
