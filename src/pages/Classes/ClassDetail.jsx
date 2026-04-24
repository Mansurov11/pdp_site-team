import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { X, UserPlus } from "lucide-react";

const AddStudentModal = ({ classId, refreshData }) => {
  // 1. State-lar (Siz taqdim etgan qismlar)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", surname: "", email: "" });
  const [loading, setLoading] = useState(false);

  // 2. Formani tozalash funksiyasi
  const resetForm = () => {
    setFormData({ name: "", surname: "", email: "" });
    setIsModalOpen(false);
  };

  // 3. Ma'lumotlarni yuborish (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      // Eslatma: Agar 404 xatosi chiqsa, backenddagi URLni qayta tekshiring
      await axios.post(
        `https://pdp-system-backend-1.onrender.com/api/v1/classes/${classId}/students`,
        { ...formData, role: "student" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("O'quvchi muvaffaqiyatli qo'shildi!");
      refreshData(); // Ro'yxatni yangilash
      resetForm();
    } catch (err) {
      console.log(err);
      
      toast.error(err.response?.data?.message || "O'quvchi qo'shishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Modalni ochish tugmasi */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all"
      >
        <UserPlus size={20} /> O'quvchi qo'shish
      </button>

      {/* Modal oynasi */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-slate-800">Yangi o'quvchi</h2>
              <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Ism kiritish */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-500 ml-2">Ism</label>
                <input 
                  required
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-transparent focus:border-indigo-500 focus:bg-white outline-none font-bold transition-all"
                  placeholder="Masalan: Ali"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Familiya kiritish */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-500 ml-2">Familiya</label>
                <input 
                  required
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-transparent focus:border-indigo-500 focus:bg-white outline-none font-bold transition-all"
                  placeholder="Masalan: Valiyev"
                  value={formData.surname}
                  onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                />
              </div>

              {/* Email kiritish */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-500 ml-2">Email</label>
                <input 
                  required
                  type="email"
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-transparent focus:border-indigo-500 focus:bg-white outline-none font-bold transition-all"
                  placeholder="ali@pdp.uz"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Tasdiqlash tugmasi */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-indigo-700 disabled:bg-slate-300 transition-all mt-4"
              >
                {loading ? "Yuborilmoqda..." : "Tizimga qo'shish"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStudentModal;