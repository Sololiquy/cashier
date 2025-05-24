"use client";

import React, { useEffect, useState } from "react";

export default function Table() {
   const dummyData = [
      { id: 1222222, name: "Product1", price: 10000 },
      { id: 2111111, name: "Product2", price: 5000 },
   ];

   const [total, setTotal] = useState(0);
   const [data, setData] = useState(dummyData);
   const [quantities, setQuantities] = useState<{ [key: number]: number }>(() => Object.fromEntries(dummyData.map((item) => [item.id, 1])));

   const handleQtyChange = (id: number, delta: number) => {
      setQuantities((prev) => ({
         ...prev,
         [id]: Math.max((prev[id] || 0) + delta, 0),
      }));
   };

   useEffect(() => {
      const newTotal = data.reduce((sum, item) => {
         const qty = quantities[item.id] || 0;
         return sum + item.price * qty;
      }, 0);
      setTotal(newTotal);
   }, [data, quantities]);

   const handleDelete = (id: number) => {
      setData((prev) => prev.filter((item) => item.id !== id));
      setQuantities((prev) => {
         const updated = { ...prev };
         delete updated[id];
         return updated;
      });
   };

   return (
      <>
         <div className="flex flex-col">
            <div className="p-4">
               <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-500 text-white">
                     <tr>
                        <th className="border px-4 py-0.5 text-left">ID</th>
                        <th className="border px-4 py-0.5 text-left">Name</th>
                        <th className="border px-4 py-0.5 text-left">Price</th>
                        <th className="border px-4 py-0.5 text-left">Qty</th>
                        <th className="border px-4 py-0.5 text-left">Total</th>
                        {/* <th className="border px-4 py-0.5 text-left">Action</th> */}
                     </tr>
                  </thead>
                  <tbody>
                     {data.map((item) => {
                        const qty = quantities[item.id] || 0;
                        return (
                           <tr key={item.id}>
                              <td className="border px-4 py-0.5">{item.id}</td>
                              <td className="border px-4 py-0.5">{item.name}</td>
                              <td className="border px-4 py-0.5">{item.price}</td>
                              <td className="border px-4 py-0.5">
                                 <div className="flex items-center gap-3">
                                    <span>{qty}</span>
                                    <div className="flex flex-row">
                                       <button onClick={() => handleQtyChange(item.id, -1)} className="size-5 bg-red-500 text-white">
                                          -
                                       </button>
                                       <button onClick={() => handleQtyChange(item.id, 1)} className="size-5 bg-green-500 text-white">
                                          +
                                       </button>
                                    </div>
                                 </div>
                              </td>
                              <td className="border px-4 py-0.5">{item.price * qty}</td>
                              <td className="border px-4 py-0.5">
                                 <button onClick={() => handleDelete(item.id)} className="px-2 py-1 bg-gray-700 text-white rounded">
                                    Delete
                                 </button>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
            <div className="flex justify-end text-2xl">TOTAL : {total}</div>
         </div>
      </>
   );
}
