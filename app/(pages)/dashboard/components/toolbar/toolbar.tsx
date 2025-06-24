"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { contextModdingData } from "../../context";

export default function Toolbar() {
   const { toolbar, setToolbar, isAdmin } = useContext(contextModdingData);
   const router = useRouter();

   const handleToolbar = (type: string) => {
      setToolbar(type);
   };

   const handleLogout = async () => {
      try {
         await fetch("/api/credential/logout", { method: "POST" });
         router.replace("/login");
      } catch (error) {
         alert(error);
      }
   };

   return (
      <div className="w-full h-full flex flex-row md:flex-col px-3 gap-1 justify-center items-center">
         <div onClick={() => handleToolbar("dashboard")} className={`flex shrink-0 cursor-pointer rounded-lg p-2 ${toolbar === "dashboard" ? "bg-gray-500" : ""}`}>
            <img className="size-12 object-cover" src="/toolbar/dashboard.svg" alt="Dashboard" />
         </div>

         {isAdmin && (
            <>
               <div onClick={() => handleToolbar("receipt")} className={`flex shrink-0 cursor-pointer rounded-lg p-2 ${toolbar === "receipt" ? "bg-gray-500" : ""}`}>
                  <img className="size-12 object-cover" src="/toolbar/receipt.svg" alt="Setting" />
               </div>
               <div onClick={() => handleToolbar("setting")} className={`flex shrink-0 cursor-pointer rounded-lg p-2 ${toolbar === "setting" ? "bg-gray-500" : ""}`}>
                  <img className="size-12 object-cover" src="/toolbar/setting.svg" alt="Setting" />
               </div>
            </>
         )}

         <hr className="hidden md:block w-full my-2 " />

         <div className={`flex grow md:grow-0 justify-end`}>
            <div onClick={handleLogout} className="flex shrink-0 cursor-pointer rounded-lg p-2 hover:bg-red-500">
               <img className="size-12 object-cover" src="/toolbar/logout.svg" alt="Logout" />
            </div>
         </div>
      </div>
   );
}
