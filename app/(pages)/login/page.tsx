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
            <div className={`flex flex-col gap-3`}>
               <button className={`${style.buttonLogin} bg-gray-300 hover:bg-gray-400 active:bg-gray-500`} onClick={handleGuestLogin}>
                  Login as Guest
               </button>
               <hr className="w-full" />
               <button className={`${style.buttonLogin} bg-red-500 hover:bg-red-600 active:bg-red-700`} onClick={handleAdminLogin}>
                  Login as Admin
               </button>
            </div>
         </div>
      </>
   );
}
