"use client";

import React from "react";

import ProductCard from "./subcomponents/productCard";

interface parameterType {
   data: {
      total_price: number;
      receipt_data: any;
      paid_status: boolean;
      checkout_date: string;
   };
}

export default function Card({ data }: parameterType) {
   const status = data.paid_status ? "SUCCESS" : "PENDING";
   const date = data.checkout_date.split("T")[0];
   const time = data.checkout_date.split("T")[1].split(".")[0];

   return (
      <>
         <div className={`flex flex-col p-3 gap-3 rounded-xl bg-gray-700`}>
            <div className={`flex flex-row gap-1`}>
               <div className={`${status === "SUCCESS" ? "bg-green-500" : "bg-red-500"} rounded-full px-2`}>{status}</div>
               <div>{data.paid_status}</div>
               <div>
                  {date} {time}
               </div>
            </div>
            <div className={`flex flex-col gap-1`}>
               {data.receipt_data.map((item: any) => (
                  <ProductCard key={item.product_id} data={item} />
               ))}
            </div>
            <hr />
            <div className={`flex flex-row gap-1 text-xl`}>
               <div className="grow font-bold">TOTAL</div>
               <div>Rp {data.total_price}</div>
            </div>
         </div>
      </>
   );
}
