import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const navClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-xl transition-all w-full ${
      isActive ? "bg-[#EEF2FF] text-[#6366F1] font-semibold" : "text-[#334155] hover:bg-gray-50 font-medium"
    }`;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <aside className="w-full h-full bg-white p-5 flex flex-col justify-between">
      <ul className="flex flex-col gap-2">
        <li><NavLink to="/home/dashboard" className={navClass}><span>Bosh sahifa</span></NavLink></li>
        <li><NavLink to="/home/classes" className={navClass}><span>Sinflar</span></NavLink></li>
        <li><NavLink to="/home/students" className={navClass}><span>O'quvchilar</span></NavLink></li>
        <li><NavLink to="/home/profile" className={navClass}><span>Profil</span></NavLink></li>
      </ul>
      <button onClick={handleLogout} className="text-red-500 p-4 font-medium hover:bg-red-50 rounded-xl transition-all">
        Chiqish
      </button>
    </aside>
  );
};

export default Sidebar;