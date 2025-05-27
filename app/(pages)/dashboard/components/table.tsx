"use client";

import React, { useContext } from "react";

import { contextModdingData } from "../context";

export default function Table() {
   const { total, setTotal, data, setData } = useContext(contextModdingData);

   const handleQtyChange = (id: number, delta: number) => {
      setData((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(item.quantity + delta, 0) } : item)));
   };

   const handleDelete = (id: number) => {
      setData((prev) => prev.filter((item) => item.id !== id));
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
                        const qty = item.quantity;
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
