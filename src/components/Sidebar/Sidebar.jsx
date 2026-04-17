import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  // Navigation helper to keep the JSX clean
  const navClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 w-full group ${
      isActive
        ? "bg-[#EEF2FF] text-[#6366F1] font-semibold"
        : "text-[#334155] hover:bg-gray-50 font-medium"
    }`;

  return (
    <aside className="w-full h-full bg-white border-r border-gray-100 p-5">
      <ul className="flex flex-col gap-2">
        {/* Bosh sahifa (Dashboard) */}
        <li>
          <NavLink to="/dashboard" className={navClass}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span>Bosh sahifa</span>
          </NavLink>
        </li>

        {/* Sinflar (Classes) */}
        <li>
          <NavLink to="/Classes" className={navClass}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
            <span>Sinflar</span>
          </NavLink>
        </li>

        {/* Profil (Students/Profile) */}
        <li>
          <NavLink to="/Students" className={navClass}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <span>Profil</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;