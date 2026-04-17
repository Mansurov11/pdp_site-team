import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="grid grid-cols-[350px_1fr] grid-rows-[64px_1fr] h-screen w-full">
      <div className="col-span-2 shadow-sm z-20">
        <Header />
      </div>
      <div className="h-full border-r border-gray-100 bg-white">
        <Sidebar />
      </div>
      <main className="overflow-y-auto bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;