"use client";

import React from "react";

import Card from "./card";

import style from "../../dashboard.module.css";

export default function FilterList() {
   return (
      <>
         <div className={`${style.filterGroupCard}`}>
            <Card type="food" />
            <Card type="drink" />
            <Card type="dessert" />
         </div>
      </>
   );
}
