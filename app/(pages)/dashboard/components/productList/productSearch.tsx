"use client";

import React, { Dispatch, SetStateAction, useContext } from "react";

//import style from "../dashboard.module.css";

import { contextModdingData } from "../../context";

interface parameterType {
   setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function ProductSearch({ setShowModal }: parameterType) {
   const { data, setData } = useContext(contextModdingData);

   const getProduct = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const productID = e.currentTarget.productID.value;

      if (data.find((item: { id: string }) => item.id === productID)) {
         setData((prev: { id: string; quantity: number }[]) => prev.map((item: { id: string; quantity: number }) => (item.id === productID ? { ...item, quantity: item.quantity + 1 } : item)));
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
            <div className={`flex flex-row gap-2 `}>
               <form className={`flex p-2 gap-2 bg-gray-700`} onSubmit={getProduct}>
                  <input className={`text-white`} type="number" name="productID" required />
                  <button className={`hover:bg-slate-600`} type="submit">
                     Add
                  </button>
               </form>
               <button className={`p-2 bg-red-500`} onClick={() => setShowModal(false)}>
                  close
               </button>
            </div>
         </div>
      </>
   );
}
