"use client";
import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ReceiptDetail from "./phase/1-ReceiptDetail/receiptDetail";
import PayMethod from "./phase/2-PayMethod/payMethod";

interface parameterType {
   data: any;
   handlePaymentModal: (data: any) => void;
   handlePay: (data: any) => void;
}

export default function ModalPayment({ data, handlePaymentModal, handlePay }: parameterType) {
   const [step, setStep] = useState<string>("receipt");
   const hasMounted = useRef(false);

   useEffect(() => {
      hasMounted.current = true;
   }, []);

   if (!data) return null;

   return (
      <div className={`fixed inset-0 flex all-center z-50 bg-black bg-opacity-50`}>
         <motion.div
            key="modal-container"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`w-full max-w-[400px] rounded-lg p-6 relative overflow-hidden bg-gray-600 text-gray-100`}
         >
            <div className={`w-full flex text-xl font-bold tracking-widest justify-center mb-3`}>Confirm Payment</div>
            <div className={`flex flex-col gap-3`}>
               <hr className={`w-full`} />

               <AnimatePresence mode="wait">
                  {step === "receipt" && (
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
                  {step === "pay" && (
                     <motion.div
                        key="pay"
                        initial={hasMounted.current ? { x: 50, opacity: 0 } : false}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex flex-col gap-3`}
                     >
                        <PayMethod />
                     </motion.div>
                  )}
               </AnimatePresence>

               <hr className={`w-full`} />
            </div>

            <div className={`mt-4 flex justify-end gap-2`}>
               <button
                  onClick={() => {
                     if (step === "pay") {
                        setStep("receipt");
                     } else {
                        handlePaymentModal(null);
                     }
                  }}
                  className={`bg-gray-700 px-4 py-2 rounded`}
               >
                  {step === "pay" ? "Back" : "Cancel"}
               </button>
               {step === "receipt" ? (
                  <button onClick={() => setStep("pay")} className={`bg-blue-600 text-white px-4 py-2 rounded`}>
                     Pay Now
                  </button>
               ) : (
                  <button onClick={() => handlePay(data)} className={`bg-green-600 text-white px-4 py-2 rounded`}>
                     Confirm
                  </button>
               )}
            </div>
         </motion.div>
      </div>
   );
}
