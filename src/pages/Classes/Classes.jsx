import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader"; // O'sha biz yaratgan Loader
import { Plus, Search, Users, BookOpen, X } from "lucide-react";

const Classes = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole, setUserRole] = useState("");
  
  // States for Adding a Student
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
    // "tyutor" yoki boshqa rollarni kichik harfga o'tkazib tekshiramiz
    const role = savedUser.role?.toLowerCase() || "";
    setUserRole(role);
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");
      
      const res = await axios.get("https://pdp-system-backend-1.onrender.com/api/v1/classes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const fetchedData = res.data?.data || res.data || [];
      setClasses(Array.isArray(fetchedData) ? fetchedData : []);
    } catch (err) {
            console.log(err.message);

      toast.error("Sinflarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!studentName.trim()) return toast.warn("Ismni kiriting");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://pdp-system-backend-1.onrender.com/api/v1/classes/${selectedClassId}/students`,
        { name: studentName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success("O'quvchi muvaffaqiyatli qo'shildi!");
      setIsModalOpen(false);
      setStudentName("");
      fetchClasses(); // Ro'yxatni yangilash
    } catch (err) {
      console.log(err.message);
      
      toast.error("O'quvchi qo'shishda xatolik yuz berdi");
    }
  };

  const canManage = userRole === "teacher" || userRole === "admin" || userRole === "tyutor";

  const filtered = classes.filter(c =>
    (c.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sizning CSS-ingizga mos Loader
  if (loading) return <Loader />;

  return (
    <div className="p-4 md:p-8 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Sinflar</h1>
        </div>

        {/* Search Bar - Better CSS Style */}
        <div className="relative mb-10">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={22} />
          <input
            type="text"
            placeholder="Sinf qidirish..."
            className="w-full bg-white border border-slate-100 rounded-[28px] py-5 pl-16 pr-8 outline-none focus:ring-4 focus:ring-indigo-500/5 font-semibold shadow-sm transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-slate-50 rounded-[40px] p-8 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group flex flex-col justify-between"
              >
                <div 
                  onClick={() => navigate(`/home/classes/${item._id}`)} 
                  className="cursor-pointer"
                >
                  <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-200">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{item.name}</h3>
                  <div className="flex items-center gap-2 text-slate-400 font-bold mt-4">
                    <Users size={18} className="text-indigo-300" /> 
                    <span>{item.students?.length || 0} o'quvchi</span>
                  </div>
                </div>

                {canManage && (
                  <button
                    onClick={() => {
                      setSelectedClassId(item._id);
                      setIsModalOpen(true);
                    }}
                    className="mt-8 w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-indigo-600 hover:text-white text-indigo-600 py-4 rounded-[20px] font-black transition-all active:scale-95"
                  >
                    <Plus size={18} /> O'quvchi qo'shish
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-slate-300 font-black uppercase tracking-widest">Sinf topilmadi</p>
            </div>
          )}
        </div>

        {/* --- ADD STUDENT MODAL --- */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl scale-in-center">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-slate-800">Yangi o'quvchi</h2>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleAddStudent}>
                <div className="mb-8">
                  <label className="block text-slate-400 font-bold text-xs uppercase tracking-widest mb-3 pl-1">O'quvchi To'liq Ismi</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 rounded-2xl p-5 outline-none font-bold text-slate-700 transition-all placeholder:text-slate-300"
                    placeholder="Masalan: Alisher Karimov"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    autoFocus
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all"
                >
                  Tizimga qo'shish
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Classes;