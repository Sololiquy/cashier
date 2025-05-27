"use client";

import React, { useEffect, useState } from "react";

import Table from "./components/table";
import ProductSearch from "./components/productSearch";
// import QRscan from "./components/QRscan";

import { contextModdingData } from "./context";

export default function Dashboard() {
   const dummyData = [
      { id: "1222222", name: "Product1", price: 10000, quantity: 1 },
      { id: "2111111", name: "Product2", price: 5000, quantity: 1 },
   ];
   const [data, setData] = useState(dummyData);
   const [total, setTotal] = useState(0);
   const [showModal, setShowModal] = useState(false);

   useEffect(() => {
      const newTotal = data.reduce((sum, item) => {
         return sum + item.price * item.quantity;
      }, 0);
      setTotal(newTotal);
   }, [data]);

   return (
      <>
         <div className="flex flex-row">
            <contextModdingData.Provider value={{ total, setTotal, data, setData }}>
               <Table />
               <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Open Product Search
               </button>

               {showModal && <ProductSearch setShowModal={setShowModal} />}
            </contextModdingData.Provider>
         </div>
      </>
   );
}
