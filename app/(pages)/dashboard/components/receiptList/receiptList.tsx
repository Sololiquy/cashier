"use client";

import React, { useContext, useEffect, useState } from "react";

import Card from "./card/card";
import Modal from "./modalPayment/modalPayment";

import { contextModdingData } from "../../context";

export default function ReceiptList() {
   const { receipt, setReceipt } = useContext(contextModdingData);
   const [openPaymentModal, setOpenPaymentModal] = useState<any>(null);

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
         setOpenPaymentModal(null);
      } catch (err) {
         console.error("Payment failed:", err);
      }
   };

   const handlePaymentModal = (data: any) => {
      setOpenPaymentModal(data);
   };

   const filteredReceipt = receipt.sort((a: any, b: any) => b.checkout_date.localeCompare(a.checkout_date));

   return (
      <>
         <div className={`w-full h-full relative `}>
            {openPaymentModal && <Modal data={openPaymentModal} handlePaymentModal={handlePaymentModal} handlePay={handlePay} />}
            <div className={`gap-3 flex flex-wrap items-start`}>
               {filteredReceipt.map((item: any) => (
                  <Card key={item.checkout_date} data={item} expand={expand} setExpand={setExpand} handlePaymentModal={handlePaymentModal} />
               ))}
            </div>
         </div>
      </>
   );
}
