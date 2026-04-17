import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    /* Changed 'auto' to '80px' (or any value like 5rem, 20, etc.) */
    <div className="grid grid-cols-[250px_1fr] grid-rows-[50px_1fr] h-screen w-full">
      
      <div className="col-span-2 shadow-md">
        <Header />
      </div>

      <Sidebar />

      <main className="overflow-y-auto bg-gray-50 p-6">
        <Outlet />
      </main>
      
    </div>
  );
};

export default Layout;