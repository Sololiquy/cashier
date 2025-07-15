"use client";

import React, { useContext } from "react";

import Card from "./card";

import { contextModdingData } from "../../../../_context";

export default function ProductManagement() {
   const { product } = useContext(contextModdingData);

   const filteredProducts = product.sort((a: any, b: any) => a.name.localeCompare(b.name));

   return (
      <>
         <div className={`flex gap-3 flex-col`}>
            <div className={`text-2xl`}>Product Management Setting</div>
            <div className={`gap-3 flex flex-row flex-wrap`}>
               {filteredProducts.map((item: any) => (
                  <Card key={item.product_id} data={item} />
               ))}
            </div>
         </div>
      </>
   );
}
