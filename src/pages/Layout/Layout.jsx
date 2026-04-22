import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen bg-[#F8FAFF] overflow-hidden">
      {/* HEADER: full top */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 z-[100]">
        <Header />
      </div>

      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* SIDEBAR: pinned below header */}
        <aside className="w-72 fixed left-0 top-16 bottom-0 bg-white border-r border-slate-100 z-40 hidden md:flex flex-col overflow-y-auto">
          <Sidebar />
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 ml-72 overflow-y-auto p-6 md:p-10">
          <div className="max-w-[1440px] mx-auto min-h-[calc(100vh-64px)]">
            <Outlet />
          </div>
          <footer className="mt-20 py-8 text-center border-t border-slate-50">
            <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.3em]">
              PDP School © 2026
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Layout;