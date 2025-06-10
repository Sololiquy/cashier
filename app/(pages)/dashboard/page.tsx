"use client";

import React, { useEffect, useState } from "react";

import FilterList from "./components/filterList/filterList";
import ProductList from "./components/productList/productList";
import CheckoutList from "./components/checkoutList/checkoutList";
import Toolbar from "./components/toolbar/toolbar";
// import QRscan from "./components/QRscan";

import { contextModdingData } from "./context";

export default function Dashboard() {
   const [checkout, setCheckout] = useState<any[]>([]);
   const [filter, setFilter] = useState<string>("");
   const [toolbar, setToolbar] = useState<string>("dashboard");
   const [total, setTotal] = useState<number>(0);

   useEffect(() => {
      const newTotal = checkout.reduce((sum, item) => {
         return sum + item.price * item.quantity;
      }, 0);
      setTotal(newTotal);
   }, [checkout]);

   return (
      <>
         <div className={`background `}></div>
         <div className="w-screen h-screen relative flex flex-col md:flex-row overflow-hidden">
            <contextModdingData.Provider value={{ total, setTotal, checkout, setCheckout, filter, setFilter, setToolbar }}>
               {toolbar === "dashboard" && (
                  <>
                     <div className="flex bg-gray-700">
                        <Toolbar />
                     </div>
                     <div className="flex flex-col p-3 gap-3 grow bg-gray-600 overflow-auto ">
                        <FilterList />
                        <ProductList />
                     </div>

                     <div className="flex bg-gray-700">
                        <CheckoutList />
                     </div>
                  </>
               )}
            </contextModdingData.Provider>
         </div>
      </>
   );
}
