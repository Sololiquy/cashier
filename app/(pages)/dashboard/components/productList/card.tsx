"use client";

import React, { useContext } from "react";

import style from "../../dashboard.module.css";

import { contextModdingData } from "../../_context";

interface parameterType {
   data: {
      product_id: string;
      name: string;
      price: number;
      url_image: string;
      availability: boolean;
   };
}

export default function Card({ data }: parameterType) {
   const { checkout, setCheckout } = useContext(contextModdingData);
   const quantity = checkout.find((item: { product_id: string }) => item.product_id === data.product_id)?.quantity || 0;

   const handleQtyChange = (id: string, value: number) => {
      const item = checkout.find((item: { product_id: string }) => item.product_id === id);

      if (item) {
         if (item.quantity === 1 && value === -1) {
            setCheckout(checkout.filter((item: { product_id: string }) => item.product_id !== id));
         } else {
            setCheckout(
               checkout.map((item: { product_id: string; quantity: number }) =>
                  item.product_id === id ? { ...item, quantity: Math.max(item.quantity + value, 1) } : item
               )
            );
         }
      } else {
         setCheckout([
            ...checkout,
            {
               ...data,
               quantity: 1,
               imageURL: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product/${data.url_image}`,
            },
         ]);
      }
   };

   const imageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product/${data.url_image}`;
   return (
      <>
         <div className={`w-[160px] p-3 gap-1 flex flex-col rounded-xl bg-gray-700`}>
            <div className={`aspect-square rounded-xl overflow-hidden relative`}>
               <img className={`w-full h-full object-cover`} src={imageURL} alt="" />
               {!data.availability ? (
                  <div className={`${style.itemavailability} w-16 bg-gray-800`}>Habis</div>
               ) : quantity > 0 ? (
                  <div className={`${style.itemavailability} size-8 bg-red-500`}>{quantity}</div>
               ) : null}
            </div>
            <div className={`font-bold text-lg`}>{data.name}</div>
            <div className={`flex flex-row`}>
               <div className=" flex flex-row gap-1">
                  {data.availability && (
                     <>
                        <button
                           onClick={quantity !== 0 ? () => handleQtyChange(data.product_id, -1) : undefined}
                           className={`size-6 ${quantity === 0 ? "cursor-not-allowed bg-gray-500" : "bg-red-500 text-white"}`}
                        >
                           -
                        </button>
                        <button onClick={() => handleQtyChange(data.product_id, 1)} className="size-6 bg-green-500 text-white">
                           +
                        </button>
                     </>
                  )}
               </div>
               <div className={`px-1 grow text-right text-base content-center`}>Rp {new Intl.NumberFormat("id-ID").format(data.price)}</div>
            </div>
         </div>
      </>
   );
}
