"use client";

import React, { useContext, useEffect, useState } from "react";

// import ProductSearch from "./productSearch";
import Card from "./card";

import { contextModdingData } from "../../context";

export default function ProductList() {
   const { filter } = useContext(contextModdingData);
   const [product, setProduct] = useState([]);
   // const [showModal, setShowModal] = useState(false);

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

   const filteredProducts = product
      .filter((item: any) => {
         if (!filter || filter.length === 0) {
            return true;
         } else {
            return item.category.some((category: string) => filter.includes(category));
         }
      })
      .sort((a: any, b: any) => a.name.localeCompare(b.name));

   console.log(product);

   return (
      <>
         <div className={`w-full h-full relative `}>
            <div className={`gap-3 flex flex-row flex-wrap`}>
               {filteredProducts.map((item: any) => (
                  <Card key={item.barcode_id} data={item} />
               ))}
            </div>
         </div>
      </>
   );
}
