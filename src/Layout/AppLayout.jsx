import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />
        <Outlet className="ml-10" />
      </main>
      <div className="p-10 text-center bg-gray-800 ml-0 w-full text-white">
        Amde with love
      </div>
    </div>
  );
};

export default AppLayout;
