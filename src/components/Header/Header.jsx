import React from "react";
import { useNavigate } from "react-router-dom";
import Pdp from "../../assets/pdp.png";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <header className="w-full h-16 bg-white px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-md shrink-0">
          <img src={Pdp} alt="PDP Logo" className="w-8 h-8 object-contain" />
        </div>
        <span className="font-bold text-gray-800 text-base">PDP School</span>
      </div>

      {/* User */}
      <div className="flex items-center gap-6">
        <div
          onClick={() => navigate("/home/profile")}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-all group"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight group-hover:text-indigo-600">
              {user?.fullName || user?.name || "O'qituvchi"}
            </p>
            <p className="text-xs text-gray-400">
              {user?.email || "email kiritilmagan"}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm uppercase shadow-sm">
            {(user?.fullName || user?.name || "A")[0]}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;