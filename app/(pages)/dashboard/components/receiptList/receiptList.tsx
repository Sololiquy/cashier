"use client";

import React, { useContext, useEffect, useState } from "react";

import Card from "./card/card";
import Modal from "./modalPayment/modalPayment";

import { contextModdingData } from "../../_context";

export default function ReceiptList() {
   const { receipt, setReceipt } = useContext(contextModdingData);
   const [openPaymentModal, setOpenPaymentModal] = useState<any>(null);

   const [expand, setExpand] = useState<string>("");

   const fetchProducts = async () => {
      try {
         const res = await fetch("/api/getAllReceipt");
         const data = await res.json();
         setReceipt(data);
      } catch (err) {
         console.error(err);
      }
   };

   useEffect(() => {
      fetchProducts();
   }, []);

   const handlePaymentModal = (data: any) => {
      setOpenPaymentModal(data);
   };

   const filteredReceipt = receipt?.sort((a: any, b: any) => b.checkout_date.localeCompare(a.checkout_date)) || [];

   return (
      <>
         <div className={`relative`}>
            {openPaymentModal && <Modal data={openPaymentModal} handlePaymentModal={handlePaymentModal} refetchReceipts={fetchProducts} />}
            <div className={`h-full p-3 gap-3 flex flex-wrap flex-row `}>
               {filteredReceipt.length === 0 ? (
                  <div className={`w-full h-full flex all-center text-gray-300 text-4xl tracking-widest`}>No receipts available</div>
               ) : (
                  filteredReceipt.map((item: any) => (
                     <Card key={item.checkout_date} data={item} expand={expand} setExpand={setExpand} handlePaymentModal={handlePaymentModal} />
                  ))
               )}
            </div>
         </div>
      </>
   );
}
