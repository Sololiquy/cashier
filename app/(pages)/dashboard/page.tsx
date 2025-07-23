"use client";

import React, { useEffect, useState } from "react";
import FilterList from "./components/filterList/filterList";
import ProductList from "./components/productList/productList";
import CheckoutList from "./components/checkoutList/checkoutList";
import ReceiptList from "./components/receiptList/receiptList";
import Setting from "./components/setting/setting";
import Toolbar from "./components/toolbar/toolbar";
// import QRscan from "./components/QRscan";

import { contextModdingData } from "./_context";

export default function Dashboard() {
   const [checkout, setCheckout] = useState<any[]>([]);
   const [product, setProduct] = useState<any[]>([]);
   const [filter, setFilter] = useState<string>("");
   const [toolbar, setToolbar] = useState<string>("dashboard");
   const [total, setTotal] = useState<number>(0);
   const [isAdmin, setIsAdmin] = useState<boolean>(false);
   const [receipt, setReceipt] = useState<any[]>([]);

   useEffect(() => {
      const checkAdmin = async () => {
         const res = await fetch("/api/credential/checkUser");
         const data = await res.json();
         setIsAdmin(data.isAdmin);
      };
      checkAdmin();
   }, []);

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
            <contextModdingData.Provider
               value={{
                  total,
                  setTotal,
                  checkout,
                  setCheckout,
                  filter,
                  setFilter,
                  product,
                  setProduct,
                  toolbar,
                  setToolbar,
                  receipt,
                  setReceipt,
                  isAdmin,
               }}
            >
               <div className="flex shrink-0 bg-gray-700">
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
               ) : toolbar === "receipt" && isAdmin ? (
                  <div className="w-full h-full bg-gray-600 overflow-auto">
                     <ReceiptList />
                  </div>
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
