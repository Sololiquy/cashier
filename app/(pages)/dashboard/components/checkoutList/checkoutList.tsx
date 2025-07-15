"use client";

import React, { useContext, useEffect, useState } from "react";

import DesktopUI from "./Layout/desktopUI";
import MobileUI from "./Layout/MobileUI/mobileUI";
import { contextModdingData } from "../../_context";

export default function CheckoutList() {
   const { total, checkout } = useContext(contextModdingData);
   const [isDesktop, setIsDesktop] = useState(false);

   useEffect(() => {
      const handleResize = () => {
         setIsDesktop(window.innerWidth > 764);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   const handleSubmitCheckout = async () => {
      try {
         const res = await fetch("/api/addCheckout", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ checkout, total }),
         });

         const result = await res.json();

         if (res.ok) {
            alert("Checkout successful!");
         } else {
            alert("Checkout failed: " + result.error);
         }
      } catch (err) {
         console.error("Checkout error", err);
         alert("Checkout error: " + err);
      }
   };

   return <>{isDesktop ? <DesktopUI handleSubmitCheckout={handleSubmitCheckout} /> : <MobileUI handleSubmitCheckout={handleSubmitCheckout} />}</>;
}
