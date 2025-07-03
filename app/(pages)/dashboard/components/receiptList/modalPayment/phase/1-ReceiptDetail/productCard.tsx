"use client";

import React, { useContext } from "react";

import { contextModdingData } from "../../../../../context";

interface parameterType {
   data: {
      price: number;
      product_id: string;
      quantity: number;
   };
}

export default function ProductCard({ data }: parameterType) {
   const { product } = useContext(contextModdingData);
   const name = product.find((item: any) => item.product_id === data.product_id).name;
   const url_image = product.find((item: any) => item.product_id === data.product_id).url_image;
   const imageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product/${url_image}`;
   return (
      <>
         <div className="w-full flex flex-row gap-2 items-center">
            <div className={`size-16 rounded-lg overflow-hidden`}>
               <img className={`w-full h-full object-cover`} src={imageURL} alt="" />
            </div>
            <div className={`flex flex-col grow`}>
               <div>{name}</div>
               <div>Rp {data.price}</div>
            </div>
            <div>x{data.quantity}</div>
         </div>
      </>
   );
}
