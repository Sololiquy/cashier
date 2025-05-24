"use client";

import React from "react";

import Table from "./components/table";
// import QRscan from "./components/QRscan";

export default function Dashboard() {
   return (
      <>
         <div className="flex flex-row">
            <Table />
         </div>
      </>
   );
}
