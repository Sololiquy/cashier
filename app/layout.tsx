import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
   title: "Cashier",
   description: "Cashier prototype",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body>
            {children}
            <div className="w-screen absolute bottom-0 text-center text-sm text-white">
               ⚠️ This is a prototype for testing purposes only. No real transactions are involved ⚠️
            </div>
         </body>
      </html>
   );
}
