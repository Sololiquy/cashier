"use client";

import React, { useContext, useEffect, useState } from "react";

import Card from "./card";
import Modal from "./modalPayment";

import { contextModdingData } from "../../context";

export default function ReceiptList() {
   const { receipt, setReceipt } = useContext(contextModdingData);
   const [selectedReceipt, setSelectedReceipt] = useState<any>(null);

   const [expand, setExpand] = useState<string>("");

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

   const handlePay = async (receipt: any) => {
      try {
         alert(`Paying receipt ID: ${receipt.checkout_date}`);
         setSelectedReceipt(null);
      } catch (err) {
         console.error("Payment failed:", err);
      }
   };

   const confirmationPay = (data: any) => {
      setSelectedReceipt(data);
   };

   const filteredReceipt = receipt.sort((a: any, b: any) => b.checkout_date.localeCompare(a.checkout_date));

   return (
      <>
         <div className={`w-full h-full relative `}>
            <div className={`gap-3 flex flex-wrap items-start`}>
               {selectedReceipt && <Modal receipt={selectedReceipt} onClose={() => setSelectedReceipt(null)} handlePay={handlePay} />}

               {filteredReceipt.map((item: any) => (
                  <Card key={item.checkout_date} data={item} expand={expand} setExpand={setExpand} confirmationPay={confirmationPay} />
               ))}
            </div>
         </div>
      </>
   );
}
