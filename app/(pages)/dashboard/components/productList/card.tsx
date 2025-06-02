"use client";

import React, { useContext, useEffect, useState } from "react";

import style from "../../dashboard.module.css";

import { contextModdingData } from "../../context";

interface parameterType {
   data: {
      barcode_id: string;
      name: string;
      price: number;
      url_image: string;
   };
}

export default function Card({ data }: parameterType) {
   const { checkout, setCheckout } = useContext(contextModdingData);
   const [quantity, setQuantity] = useState(0);

   useEffect(() => {
      const item = checkout.find((item: { barcode_id: string }) => item.barcode_id === data.barcode_id);
      setQuantity(item ? item.quantity : 0);
   }, [checkout, data.barcode_id]);

   const handleQtyChange = (id: string, value: number) => {
      const item = checkout.find((item: { barcode_id: string }) => item.barcode_id === id);

      if (item) {
         if (item.quantity === 1 && value === -1) {
            setCheckout(checkout.filter((item: { barcode_id: string }) => item.barcode_id !== id));
         } else {
            setCheckout(checkout.map((item: { barcode_id: string; quantity: number }) => (item.barcode_id === id ? { ...item, quantity: Math.max(item.quantity + value, 1) } : item)));
         }
      } else {
         setCheckout([
            ...checkout,
            {
               barcode_id: data.barcode_id,
               name: data.name,
               price: data.price,
               quantity: 1,
            },
         ]);
      }
   };

   const imageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product/${data.url_image}`;
   return (
      <>
         <div className={`w-40 h-52 p-1 flex flex-col rounded-xl bg-gray-700`}>
            <div className={`size-[152px] rounded-xl overflow-hidden relative`}>
               <img className={`w-full h-full object-cover`} src={imageURL} alt="" />
               {quantity > 0 && <div className={`${style.itemQuantity} bg-red-500`}>{quantity}</div>}
            </div>
            <div className={`font-bold text-xl`}>{data.name}</div>
            <div className={`flex flex-row`}>
               <div className="pl-3 flex flex-row">
                  <button
                     onClick={quantity !== 0 ? () => handleQtyChange(data.barcode_id, -1) : undefined}
                     className={`size-5 ${quantity === 0 ? "cursor-not-allowed bg-gray-500" : "bg-red-500 text-white"}`}
                  >
                     -
                  </button>
                  <button onClick={() => handleQtyChange(data.barcode_id, 1)} className="size-5 bg-green-500 text-white">
                     +
                  </button>
               </div>
               <div className={`px-1 grow text-sm text-right`}>Rp.{data.price}</div>
            </div>
         </div>
      </>
   );
}
