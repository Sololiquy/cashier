"use client";

import React, { useContext, useEffect } from "react";

import Card from "./card";

import { contextModdingData } from "../../context";

export default function ReceiptList() {
   const { receipt, setReceipt } = useContext(contextModdingData);

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const res = await fetch("/api/getAllReceipt");
            const data = await res.json();
            setReceipt(data);
         } catch (err) {
            console.error(err);
         }
      };
      fetchProducts();
   }, []);

   const filteredReceipt = receipt.sort((a: any, b: any) => b.checkout_date.localeCompare(a.checkout_date));

   return (
      <>
         <div className={`w-full h-full relative `}>
            <div className={`gap-3 flex flex-wrap items-start`}>
               {filteredReceipt.map((item: any) => (
                  <Card key={item.checkout_date} data={item} />
               ))}
            </div>
         </div>
      </>
   );
}
