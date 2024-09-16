"use client";
import { usePathname } from "next/navigation";
import Loader from "../components/common/Loader";
import "flatpickr/dist/flatpickr.min.css";
import "../css/satoshi.css";
import "../css/style.css";
import React, { useEffect, useState } from "react";
import { connectToMongoDB } from "../lib/db/connection/mongodb";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
  );
}
