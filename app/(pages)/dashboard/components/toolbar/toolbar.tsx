"use client";

import React, { useContext } from "react";

import { contextModdingData } from "../../context";

export default function Toolbar() {
   const { toolbar, setToolbar } = useContext(contextModdingData);

   const handleToolbar = (type: string) => {
      setToolbar(type);
   };

   return (
      <>
         <div className={`flex flex-col px-3 gap-1 justify-center items-center`}>
            <div onClick={() => handleToolbar("dashboard")} className={`cursor-pointer rounded-lg p-2 ${toolbar === "dashboard" ? "bg-gray-500" : ""} hover:text-white`}>
               <img className={`size-12 object-cover`} src="/toolbar/dashboard.svg" alt="" />
            </div>
            <div onClick={() => handleToolbar("setting")} className={`cursor-pointer rounded-lg p-2 ${toolbar === "setting" ? "bg-gray-500" : ""}`}>
               <img className={`size-12 object-cover`} src="/toolbar/setting.svg" alt="" />
            </div>
         </div>
      </>
   );
}
