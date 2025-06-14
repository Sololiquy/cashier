"use client";

import React, { useEffect, useState } from "react";

import FilterList from "./components/filterList/filterList";
import ProductList from "./components/productList/productList";
import CheckoutList from "./components/checkoutList/checkoutList";
import Setting from "./components/setting/setting";
import Toolbar from "./components/toolbar/toolbar";
// import QRscan from "./components/QRscan";

import { contextModdingData } from "./context";

export default function Dashboard() {
   const [checkout, setCheckout] = useState<any[]>([]);
   const [product, setProduct] = useState<any[]>([]);
   const [filter, setFilter] = useState<string>("");
   const [toolbar, setToolbar] = useState<string>("dashboard");
   const [total, setTotal] = useState<number>(0);

   console.log(checkout, product);

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const res = await fetch("/api/getAllProduct");
            const data = await res.json();
            setProduct(data);
         } catch (err) {
            console.error(err);
         }
      };
      fetchProducts();
   }, []);

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
            <contextModdingData.Provider value={{ total, setTotal, checkout, setCheckout, filter, setFilter, product, setProduct, toolbar, setToolbar }}>
               <div className="flex bg-gray-700">
                  <Toolbar />
               </div>
               {toolbar === "dashboard" ? (
                  <>
                     <div className="flex flex-col p-3 gap-3 grow bg-gray-600 overflow-auto">
                        <FilterList />
                        <ProductList />
                     </div>
                     <div className="flex bg-gray-700">
                        <CheckoutList />
                     </div>
                  </>
               ) : toolbar === "setting" ? (
                  <div className="flex p-3 grow bg-gray-600 ">
                     <Setting />
                  </div>
               ) : null}
            </contextModdingData.Provider>
         </div>
      </>
   );
}
