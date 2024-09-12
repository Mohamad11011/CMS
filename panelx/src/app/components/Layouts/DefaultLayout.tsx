'use client'
import React, { useState, ReactNode } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Image from "next/image";

export default function DefaultLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: any;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          {/* <!-- ===== Header Start ===== --> */}
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            session={session}
          />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main className="relative min-h-screen">
            {session && session.user && session.user.email ? (
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            ) : (
              // <div className="absolute left-1/2 top-12 -translate-x-1/2 flex items-center flex-col">
              //   <div className="w-[400px]">
              //     <Image
              //       src={"/images/authorization/auth.png"}
              //       alt=" "
              //       width={800}
              //       height={800}
              //       className="w-full select-none"
              //     />
              //   </div>
              //   <div className="font-bold text-4xl text-boxdark/80">
              //     Login to Proceed
              //   </div>
              // </div>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            )}
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
