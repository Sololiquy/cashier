"use client";

import React from "react";

export default function Toolbar() {
   return (
      <>
         <div className={`flex flex-col px-3 gap-3 justify-center items-center`}>
            <img className={`size-12 object-cover`} src="/toolbar/dashboard.svg" alt="" />
            <img className={`size-12 object-cover`} src="/toolbar/setting.svg" alt="" />
         </div>
      </>
   );
}
