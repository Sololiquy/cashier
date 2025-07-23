"use client";
import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ReceiptDetail from "./phase/1-ReceiptDetail/receiptDetail";
import PayMethod from "./phase/2-PayMethod/payMethod";
import PaymentProcess from "./phase/3-PaymentProcess/paymentProcess";

interface parameterType {
   data: any;
   handlePaymentModal: (data: any) => void;
   refetchReceipts: () => void;
}

export default function ModalPayment({ data, handlePaymentModal, refetchReceipts }: parameterType) {
   const [phase, setPhase] = useState<number>(1);
   // 1 = Receipt Detail, 2 = Pay Method
   const [paymentMethod, setPaymentMethod] = useState<number | null>(null);
   // 1 = Cash, 2 = QRIS

   // Payment with manual
   const [payTotal, setPayTotal] = useState<number>(0);

   const hasMounted = useRef(false);
   useEffect(() => {
      hasMounted.current = true;
   }, []);

   const handlePaymentManual = async () => {
      const checkout_date = data.checkout_date;
      try {
         const res = await fetch("/api/payment/manual", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ checkout_date, payTotal }),
         });

         if (res.ok) {
            alert("Payment Succesful!");
            await refetchReceipts();
            handlePaymentModal(null);
         } else {
            const result = await res.json();
            alert(result.error || "Payment failed");
         }
      } catch (error) {
         console.error(error);
         alert(error);
      }
   };

   if (!data) return null;

   return (
      <div className={`fixed inset-0 flex all-center z-50 bg-black bg-opacity-50`}>
         <motion.div
            key="modal-container"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`w-screen md:w-[400px] h-screen md:h-auto flex flex-col rounded-none md:rounded-lg p-6 relative overflow-hidden bg-gray-600 text-gray-100`}
         >
            <div className={`flex text-xl font-bold tracking-widest justify-center mb-3`}>Confirm Payment</div>

            <hr className={`w-full`} />

            <div className={`flex flex-col grow gap-3 mt-3 mb-3`}>
               <AnimatePresence mode="wait">
                  {phase === 1 && (
                     <motion.div
                        key="receipt"
                        initial={hasMounted.current ? { x: 50, opacity: 0 } : false}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex flex-col gap-3`}
                     >
                        <ReceiptDetail data={data} />
                     </motion.div>
                  )}
                  {phase === 2 && (
                     <motion.div
                        key="pay"
                        initial={hasMounted.current ? { x: 50, opacity: 0 } : false}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex flex-col gap-3`}
                     >
                        <PayMethod setPaymentMethod={setPaymentMethod} paymentMethod={paymentMethod} />
                     </motion.div>
                  )}
                  {phase === 3 && (
                     <motion.div
                        key="process"
                        initial={hasMounted.current ? { x: 50, opacity: 0 } : false}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex flex-col gap-3`}
                     >
                        <PaymentProcess total_price={data.total_price} paymentMethod={paymentMethod} payTotal={payTotal} setPayTotal={setPayTotal} />
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>

            <hr className={`w-full`} />

            <div className={`mt-4 flex justify-end gap-2`}>
               <button
                  onClick={() => {
                     if (phase > 1) {
                        setPhase((prev) => prev - 1);
                     } else {
                        handlePaymentModal(null);
                     }
                  }}
                  className={`bg-gray-700 px-4 py-2 rounded`}
               >
                  {phase <= 1 ? "Cancel" : "Back"}
               </button>
               {phase === 1 ? (
                  <button onClick={() => setPhase((prev) => prev + 1)} className={`bg-blue-600 text-white px-4 py-2 rounded`}>
                     Next
                  </button>
               ) : phase === 2 ? (
                  <button
                     disabled={paymentMethod === null}
                     onClick={() => setPhase((prev) => prev + 1)}
                     className={`${paymentMethod === null ? "bg-gray-700" : "bg-blue-600"} text-white px-4 py-2 rounded`}
                  >
                     Next
                  </button>
               ) : phase === 3 ? (
                  <button
                     disabled={payTotal < data.total_price}
                     onClick={handlePaymentManual}
                     className={` ${payTotal < data.total_price ? "bg-gray-700" : "bg-green-600"} text-white px-4 py-2 rounded`}
                  >
                     Pay Now
                  </button>
               ) : null}
            </div>
         </motion.div>
      </div>
   );
}
