import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft, School } from "lucide-react";

const CreateClass = () => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name || !grade) return toast.warning("Barcha maydonlarni to'ldiring!");

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post("https://pdp-system-backend-1.onrender.com/api/v1/classes", 
        { name, grade: Number(grade) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Yangi sinf muvaffaqiyatli yaratildi!");
      navigate("/home/classes"); // Redirect to the classes list
    } catch (err) {
      toast.error(err.response?.data?.message || "Sinf yaratishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <button 
        onClick={() => navigate("/home/classes")} 
        className="mb-8 flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold transition-colors"
      >
        <ArrowLeft size={18} /> Bekor qilish
      </button>

      <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10 md:p-12">
        <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                <School size={32} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 text-center">Yangi sinf yaratish</h2>
            <p className="text-slate-400 font-medium text-center mt-2">Ma'lumotlarni kiriting va tasdiqlang</p>
        </div>

        <form onSubmit={handleCreate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-2">Sinf nomi</label>
            <input 
              type="text" 
              placeholder="Masalan: 10-A yoki Frontend-23" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all font-bold text-slate-800" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-2">Sinf darajasi (Grade)</label>
            <input 
              type="number" 
              placeholder="Masalan: 10" 
              value={grade} 
              onChange={(e) => setGrade(e.target.value)} 
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all font-bold text-slate-800" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className={`w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
                <>
                    <div className="w-5 h-5 border-2 border-white/30 border-b-white rounded-full animate-spin" />
                    Yaratilmoqda...
                </>
            ) : "Sinfni tasdiqlash"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClass;