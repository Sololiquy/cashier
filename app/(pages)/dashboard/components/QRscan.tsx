// "use client";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import { useEffect } from "react";

// export default function QRScan() {
//    useEffect(() => {
//       const scanner = new Html5QrcodeScanner(
//          "reader",
//          {
//             fps: 10,
//             qrbox: { width: 250, height: 250 },
//          },
//          false
//       );

//       scanner.render(
//          (decodedText, decodedResult) => {
//             console.log("Success:", decodedText);
//          },
//          (errorMessage) => {
//             // console.log("Scan error:", errorMessage);
//          }
//       );
//    }, []);

//    return (
//       <>
//          <div id="reader" style={{ width: "300px" }} />;
//       </>
//    );
// }
