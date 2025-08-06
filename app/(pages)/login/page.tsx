"use client";

import React from "react";

import style from "./login.module.css";
import { useRouter } from "next/navigation";
export default function Login() {
   const router = useRouter();

   const handleGuestLogin = async () => {
      try {
         const res = await fetch("/api/credential/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
         });

         if (res.ok) {
            router.push("/dashboard");
         } else {
            alert("Guest login failed.");
         }
      } catch (error) {
         alert(error);
      }
   };

   const handleAdminLogin = async () => {
      const password = prompt("Enter admin password:");
      if (!password) return;

      try {
         const res = await fetch("/api/credential/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
         });

         if (res.ok) {
            router.push("/dashboard");
         } else {
            alert("Wrong password.");
         }
      } catch (error) {
         alert(error);
      }
   };

   return (
      <>
         <div className={`background bg-gray-600`}></div>
         <div className={`w-screen h-screen relative flex all-center overflow-hidden`}>
            <div className={`flex flex-col md:flex-row gap-10`}>
               <div className={`flex flex-col gap-2 items-center `}>
                  <button className={`${style.buttonLogin} bg-gray-500 hover:bg-gray-400 active:bg-gray-500`} onClick={handleGuestLogin}>
                     <img className="aspect-square object-cover" src="/login/guest.svg" alt="Setting" />
                  </button>
                  <div className={`text-2xl font-bold`}>Guest</div>
               </div>
               <div className={`flex flex-col gap-2 items-center`}>
                  <button className={`${style.buttonLogin} bg-red-500 hover:bg-red-600 active:bg-red-700`} onClick={handleAdminLogin}>
                     <img className="aspect-square object-cover" src="/login/admin.svg" alt="Setting" />
                  </button>
                  <div className={`text-2xl font-bold`}>Admin</div>
               </div>
            </div>
         </div>
      </>
   );
}
