"use client";

import React, { useEffect, useState } from "react";

import ProductList from "./components/productList/productList";
import Table from "./components/table";
// import QRscan from "./components/QRscan";

import { contextModdingData } from "./context";

export default function Dashboard() {
   const [checkout, setCheckout] = useState<any[]>([]);
   const [total, setTotal] = useState(0);

   useEffect(() => {
      const newTotal = checkout.reduce((sum, item) => {
         return sum + item.price * item.quantity;
      }, 0);
      setTotal(newTotal);
   }, [checkout]);

   return (
      <>
         <div className={`background bg-gray-700`}></div>
         <div className="w-screen h-screen relative flex flex-row">
            <contextModdingData.Provider value={{ total, setTotal, checkout, setCheckout }}>
               <ProductList />
               <Table />
            </contextModdingData.Provider>
         </div>
      </>
   );
}
