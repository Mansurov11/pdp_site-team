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
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post("https://pdp-system-backend-1.onrender.com/api/v1/classes", 
        { name, grade: Number(grade) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Sinf yaratildi!");
      navigate("/home/classes");
    } catch (err) {
      toast.error(err.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <button onClick={() => navigate("/home/classes")} className="mb-8 flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold transition-all">
        <ArrowLeft size={18} /> Bekor qilish
      </button>

      <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10">
        <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4"><School size={32} /></div>
            <h2 className="text-3xl font-black text-slate-900">Yangi sinf yaratish</h2>
        </div>

        <form onSubmit={handleCreate} className="space-y-6">
          <input required type="text" placeholder="Sinf nomi (masalan: 10-A)" value={name} onChange={e => setName(e.target.value)} className="w-full px-6 py-4 rounded-2xl border border-slate-100 outline-none focus:border-indigo-500 font-bold" />
          <input required type="number" placeholder="Daraja (masalan: 10)" value={grade} onChange={e => setGrade(e.target.value)} className="w-full px-6 py-4 rounded-2xl border border-slate-100 outline-none focus:border-indigo-500 font-bold" />
          <button type="submit" disabled={loading} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl transition-all">
            {loading ? "Yaratilmoqda..." : "Tasdiqlash"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClass;