"use client";

import React from "react";

import Card from "./card";

export default function FilterList() {
   return (
      <>
         <div className={`flex flex-row gap-5 justify-center`}>
            <Card type="food" />
            <Card type="drink" />
            <Card type="dessert" />
         </div>
      </>
   );
}
