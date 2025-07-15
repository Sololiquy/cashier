"use client";

import React, { useContext } from "react";

import Card from "./card";

import { contextModdingData } from "../../_context";

export default function ProductList() {
   const { filter, product } = useContext(contextModdingData);

   const filteredProducts = product
      .filter((item: any) => {
         if (!filter || filter.length === 0) {
            return true;
         } else {
            return item.category.some((category: string) => filter.includes(category));
         }
      })
      .sort((a: any, b: any) => a.name.localeCompare(b.name));

   return (
      <>
         <div className={`w-full h-full relative `}>
            <div className={`gap-3 flex flex-row flex-wrap`}>
               {filteredProducts.map((item: any) => (
                  <Card key={item.product_id} data={item} />
               ))}
            </div>
         </div>
      </>
   );
}
