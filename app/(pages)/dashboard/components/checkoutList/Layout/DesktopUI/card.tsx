"use client";

import React from "react";

import style from "../../../../dashboard.module.css";

interface parameterType {
   data: {
      product_id: string;
      name: string;
      price: number;
      quantity: number;
      imageURL: string;
   };
}

export default function Card({ data }: parameterType) {
   return (
      <>
         <div className={`gap-3 flex flex-row`}>
            <div className={`${style.tab_image}  rounded-xl overflow-hidden relative`}>
               <img className={`w-full h-full object-cover`} src={data.imageURL} alt="" />
            </div>
            <div className={`${style.tab_info}`}>
               <span className={`text-lg`}>{data.name}</span>
               <span className={`text-sm`}>Rp. {data.price}</span>
            </div>
            <div className={`${style.tab_qty}`}>x{data.quantity}</div>
            <div className={`${style.tab_total}`}>Rp. {data.quantity * data.price}</div>
         </div>
      </>
   );
}
