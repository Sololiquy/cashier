"use client";

import React, { Dispatch, SetStateAction, useContext } from "react";

//import style from "../dashboard.module.css";

import { contextModdingData } from "../context";

interface parameterType {
   setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function ProductSearch({ setShowModal }: parameterType) {
   const { data, setData } = useContext(contextModdingData);

   const getProduct = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const productID = e.currentTarget.productID.value;

      if (data.find((item: { id: any }) => item.id === productID)) {
         setData((prev: { id: any; quantity: number }[]) => prev.map((item: { id: any; quantity: number }) => (item.id === productID ? { ...item, quantity: item.quantity + 1 } : item)));
      } else {
         try {
            const res = await fetch("/api/getProduct", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ productID }),
            });

            const result = await res.json();

            if (result.error) {
               alert(result.error);
            } else {
               setData((prev: any) => [
                  ...prev,
                  {
                     id: result.id,
                     name: result.name,
                     price: result.price,
                     quantity: 1,
                  },
               ]);
               setShowModal(false);
            }
         } catch (error) {
            console.error("Error fetching product:", error);
         }
      }
   };
   return (
      <>
         <div className={`fixed inset-0 z-50 bg-opacity-30 backdrop-blur-md flex all-center`}>
            <div className={`flex p-2 bg-gray-700`}>
               <form className={`flex gap-2`} onSubmit={getProduct}>
                  <input className={`text-white`} type="number" name="productID" required />
                  <button className={`hover:bg-slate-600`} type="submit">
                     Add
                  </button>
               </form>
            </div>
         </div>
      </>
   );
}
