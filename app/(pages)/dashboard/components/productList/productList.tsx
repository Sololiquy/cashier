"use client";

import React, { useEffect, useState } from "react";

import ProductSearch from "./productSearch";
import Card from "./card";

export default function ProductList() {
   const [product, setProduct] = useState([]);
   const [showModal, setShowModal] = useState(false);

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

   return (
      <>
         <div className={`background`}></div>
         <div className={`w-full h-full relative bg-gray-600`}>
            <div className={`p-3 gap-3 flex flex-row flex-wrap`}>
               {product.map((item, index) => (
                  <Card key={index} data={item} />
               ))}
            </div>
            <button onClick={() => setShowModal(true)} className=" px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
               Open Product Search
            </button>
         </div>
         {showModal && <ProductSearch setShowModal={setShowModal} />}
      </>
   );
}
