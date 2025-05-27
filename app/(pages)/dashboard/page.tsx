"use client";

import React, { useEffect, useState } from "react";

import Table from "./components/table";
// import QRscan from "./components/QRscan";

import { contextModdingData } from "./context";

export default function Dashboard() {
   const dummyData = [
      { id: "1222222", name: "Product1", price: 10000, quantity: 1 },
      { id: "2111111", name: "Product2", price: 5000, quantity: 1 },
   ];
   const [data, setData] = useState(dummyData);
   const [total, setTotal] = useState(0);

   useEffect(() => {
      const newTotal = data.reduce((sum, item) => {
         return sum + item.price * item.quantity;
      }, 0);
      setTotal(newTotal);
   }, [data]);

   const getProduct = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const productID = e.currentTarget.productID.value;

      if (data.find((item) => item.id === productID)) {
         setData((prev) => prev.map((item) => (item.id === productID ? { ...item, quantity: item.quantity + 1 } : item)));
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
               setData((prev) => [
                  ...prev,
                  {
                     id: result.id,
                     name: result.name,
                     price: result.price,
                     quantity: 1,
                  },
               ]);
            }
         } catch (error) {
            console.error("Error fetching product:", error);
         }
      }
   };

   return (
      <>
         <div className="flex flex-row">
            <contextModdingData.Provider value={{ total, setTotal, data, setData }}>
               <Table />
               <form onSubmit={getProduct}>
                  <input className={`text-white`} type="number" name="productID" required />
                  <button className={`hover:bg-slate-600`} type="submit">
                     Add
                  </button>
               </form>
            </contextModdingData.Provider>
         </div>
      </>
   );
}
