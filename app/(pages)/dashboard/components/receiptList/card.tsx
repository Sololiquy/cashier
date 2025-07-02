"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";

import ProductCard from "./subcomponents/productCard";

// import style from "../../dashboard.module.css";

interface parameterType {
   data: {
      total_price: number;
      receipt_data: any;
      paid_status: boolean;
      checkout_date: string;
   };
   expand: string;
   setExpand: (val: string) => void;
   confirmationPay: (data: any) => void;
}

export default function Card({ data, expand, setExpand, confirmationPay }: parameterType) {
   const status = data.paid_status ? "SUCCESS" : "PENDING";
   const date = data.checkout_date.split("T")[0];
   const time = data.checkout_date.split("T")[1].split(".")[0];

   const handleExpandableCard = (checkout_date: string) => {
      if (expand === checkout_date) {
         setExpand("");
      } else {
         setExpand(checkout_date);
      }
   };

   return (
      <>
         <div className={`min-w-[256px] max-w-[300px] w-full flex flex-col rounded-xl bg-gray-700`}>
            <div className={`flex flex-col p-3 pb-1 gap-3`}>
               <div className={`flex flex-row gap-1`}>
                  <div className={`${status === "SUCCESS" ? "bg-green-500" : "bg-red-500"} rounded-full px-2`}>{status}</div>
                  <div>{data.paid_status}</div>
                  <div>
                     {date} {time}
                  </div>
               </div>
               <AnimatePresence initial={false}>
                  {expand === data.checkout_date && (
                     <motion.div
                        className="flex flex-col gap-1 overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                     >
                        {data.receipt_data.map((item: any) => (
                           <ProductCard key={item.product_id} data={item} />
                        ))}
                     </motion.div>
                  )}
               </AnimatePresence>
               <hr />
               <div className={`flex flex-row gap-1 text-xl`}>
                  <div className="grow font-bold">TOTAL</div>
                  <div>Rp {data.total_price}</div>
               </div>
               <button
                  className={`px-4 py-2 text-white rounded ${data.paid_status ? "bg-green-500" : "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700"}`}
                  disabled={data.paid_status}
                  onClick={() => confirmationPay(data)}
               >
                  {data.paid_status ? "Show details" : "Pay now"}
               </button>
            </div>
            <button className={`flex text-gray-400 hover:text-white italic justify-center`} onClick={() => handleExpandableCard(data.checkout_date)}>
               {expand === data.checkout_date ? "▲ Collapse ▲" : "▼ Details ▼"}
            </button>
         </div>
      </>
   );
}
