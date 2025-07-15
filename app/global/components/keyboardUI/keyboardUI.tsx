"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface KeyboardModalProps {
   onClose: () => void;
   onConfirm: (value: number) => void;
   initialValue?: number;
}

export default function KeyboardUI({ onClose, onConfirm, initialValue = 0 }: KeyboardModalProps) {
   const [value, setValue] = useState(initialValue.toString());

   const handleInput = (input: string) => {
      if (input === "DEL") setValue(value.slice(0, -1));
      else if (input === "CLR") setValue("");
      else setValue(value + input);
   };

   const handleConfirm = () => {
      onConfirm(Number(value || "0"));
      onClose();
   };

   return (
      <AnimatePresence>
         <motion.div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
         >
            <motion.div
               className={`bg-gray-800 p-6 rounded-lg grid gap-3 text-white w-[260px]`}
               onClick={(e) => e.stopPropagation()}
               initial={{ scale: 0.8 }}
               animate={{ scale: 1 }}
               exit={{ scale: 0.8 }}
            >
               <div className={`text-right text-2xl bg-gray-700 px-3 py-2 rounded`}>{value || "0"}</div>
               <div className={`grid grid-cols-3 gap-2`}>
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "CLR", "0", "DEL"].map((key) => (
                     <button key={key} className={`bg-gray-600 py-3 rounded hover:bg-gray-500 transition`} onClick={() => handleInput(key)}>
                        {key}
                     </button>
                  ))}
               </div>
               <button className={`bg-blue-500 py-3 rounded hover:bg-blue-400 transition`} onClick={handleConfirm}>
                  Confirm
               </button>
            </motion.div>
         </motion.div>
      </AnimatePresence>
   );
}
