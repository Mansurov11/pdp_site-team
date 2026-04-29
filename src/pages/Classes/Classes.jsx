import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { Plus, Search, Users, BookOpen, X, ShieldCheck } from "lucide-react";

const Classes = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole, setUserRole] = useState("");
  const [studentCounts, setStudentCounts] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "password123",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.role || "");
    }
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const res = await axios.get(
        "https://pdp-system-backend-1.onrender.com/api/v1/classes",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const fetchedData = res.data?.data || res.data || [];
      const arr = Array.isArray(fetchedData) ? fetchedData : [];
      setClasses(arr);

      const counts = {};
      await Promise.all(
        arr.map(async (cls) => {
          const classId = cls._id || cls.id;
          try {
            const detail = await axios.get(
              `https://pdp-system-backend-1.onrender.com/api/v1/scores/class/${classId}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            counts[classId] = (detail.data?.data || []).length;
          } catch {
            counts[classId] = 0;
          }
        })
      );
      setStudentCounts(counts);
    } catch (err) {
      toast.error("Sinflarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Use register endpoint — works for all roles including teacher
      await axios.post(
        `https://pdp-system-backend-1.onrender.com/api/v1/auth/register`,
        {
          fullName: formData.fullName.trim(),
          email: formData.email,
          password: formData.password,
          classId: selectedClassId,
        }
      );

      toast.success("O'quvchi muvaffaqiyatli qo'shildi!");
      setIsModalOpen(false);
      setFormData({ fullName: "", email: "", password: "password123" });
      fetchClasses();
    } catch (err) {
      console.error("Add student error:", err.response?.data);
      toast.error(err.response?.data?.message || "O'quvchi qo'shishda xatolik");
    } finally {
      setSubmitting(false);
    }
  };

  const canManage = ["teacher", "admin", "tyutor"].includes(userRole);
  const filtered = classes.filter((c) =>
    (c.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div className="p-4 md:p-8 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Sinflar
          </h1>
          {userRole === "admin" && (
            <div className="flex items-center gap-2 bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full font-bold text-sm">
              <ShieldCheck size={16} /> <span>Admin</span>
            </div>
          )}
        </div>


        <div className="relative mb-10">
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"
            size={22}
          />
          <input
            type="text"
            placeholder="Sinf qidirish..."
            className="w-full bg-white border border-slate-100 rounded-[28px] py-5 pl-16 pr-8 outline-none focus:ring-4 focus:ring-indigo-500/5 font-semibold shadow-sm transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => {
            const classId = item._id || item.id;
            return (
              <div
                key={classId}
                className="bg-white border border-slate-50 rounded-[40px] p-8 hover:shadow-2xl transition-all group flex flex-col justify-between h-full"
              >
                <div
                  onClick={() => navigate(`/home/classes/${classId}`)}
                  className="cursor-pointer"
                >
                  <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400 font-bold mt-4">
                    <Users size={18} className="text-indigo-300" />
                    <span>{studentCounts[classId] ?? "..."} o'quvchi ro'yxatda</span>
                  </div>
                </div>

                {canManage && (
                  // <button
                  //   onClick={() => {
                  //     setSelectedClassId(classId);
                  //     setIsModalOpen(true);
                  //   }}
                  //   className="mt-8 w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-indigo-600 hover:text-white text-indigo-600 py-4 rounded-[20px] font-black transition-all active:scale-95"
                  // >
                  //   <Plus size={18} /> O'quvchi qo'shish
                  // </button>
                  <></>
                )}
              </div>
            );
          })}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-[35px] p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-800">
                  Yangi o'quvchi
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleAddStudent} className="space-y-4">
                <input
                  required
                  placeholder="To'liq ism (Ism Familiya)"
                  className="w-full bg-slate-50 p-4 rounded-2xl outline-none border-2 border-transparent focus:border-indigo-500 font-bold"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="w-full bg-slate-50 p-4 rounded-2xl outline-none border-2 border-transparent focus:border-indigo-500 font-bold"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  required
                  type="password"
                  placeholder="Parol"
                  className="w-full bg-slate-50 p-4 rounded-2xl outline-none border-2 border-transparent focus:border-indigo-500 font-bold"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-700 transition-all mt-4 disabled:opacity-60"
                >
                  {submitting ? "Yuborilmoqda..." : "Qo'shish"}
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