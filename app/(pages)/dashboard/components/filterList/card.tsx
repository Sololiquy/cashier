"use client";

import React, { useContext } from "react";

import style from "../../dashboard.module.css";

import { contextModdingData } from "../../_context";

interface parameterType {
   type: string;
}

export default function Card({ type }: parameterType) {
   const { filter, setFilter } = useContext(contextModdingData);

   const handleFilter = (filterType: string) => {
      setFilter(filterType);
   };

   return (
      <>
         <button
            className={`${style.buttonFilter} ${type === filter ? style.buttonFilterActive : ""}`}
            onClick={() => handleFilter(type === filter ? "" : type)}
         >
            <img className={`size-6 object-cover`} src={`/category/${type}.svg`} alt="" />
            <div className={`flex grow justify-center`}>{type.toUpperCase()}</div>
         </button>
      </>
   );
}
