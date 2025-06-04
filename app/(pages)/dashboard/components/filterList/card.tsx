"use client";

import React, { useContext } from "react";

import style from "../../dashboard.module.css";

import { contextModdingData } from "../../context";

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
         <button className={`${style.buttonFilter} ${type === filter ? style.buttonFilterActive : ""}`} onClick={() => handleFilter(type)}>
            {type.toUpperCase()}
         </button>
      </>
   );
}
