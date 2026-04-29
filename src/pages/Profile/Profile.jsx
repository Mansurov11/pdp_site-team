import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, Mail, Phone, Lock, Eye, EyeOff, Save, Camera, Shield, Loader2 } from "lucide-react";
import Loader from "../../components/Loader";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  
  // State for form data
  const [passData, setPassData] = useState({ currentPassword: "", newPassword: "" });
  
  // State for toggling visibility (The "Shower")
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const API_BASE = "https://pdp-system-backend-1.onrender.com/api/v1";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return setLoading(false);
      try {
        const res = await axios.get(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data?.data || res.data);
      } catch (err) {
        showStatus("Ma'lumot olishda xatolik!", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [token]);

  const showStatus = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!passData.currentPassword || !passData.newPassword) {
      return showStatus("Maydonlarni to'ldiring!", "error");
    }

    setUpdating(true);
    try {
      await axios.patch(
        `${API_BASE}/auth/update-password`,
        { 
          oldPassword: passData.currentPassword, 
          newPassword: passData.newPassword 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showStatus("Parol yangilandi!", "success");
      setPassData({ currentPassword: "", newPassword: "" });
      setShowCurrent(false);
      setShowNew(false);
    } catch (error) {
      showStatus(error.response?.data?.message || "Xatolik!", "error");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#FBFDFF] p-6 md:p-10 font-sans">
      {message.text && (
        <div className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-2xl shadow-lg font-bold animate-in slide-in-from-right ${message.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
          {message.text}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 mb-8">Profil</h1>

        {/* Profile Card */}
        <div className="bg-white rounded-[35px] border border-slate-100 shadow-sm mb-10 overflow-hidden">
          <div className="p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 bg-indigo-50 rounded-3xl flex items-center justify-center text-4xl font-black text-indigo-400">
                {user?.fullName?.charAt(0)}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-800">{user?.fullName}</h2>
              <p className="text-indigo-500 font-bold uppercase text-xs tracking-widest mt-1">
                {user?.role || "O'qituvchi"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Info */}
          <Section title="Ma'lumotlar" icon={<User size={20} />}>
             <Row label="F.I.SH" value={user?.fullName} icon={<User size={16} />} />
             <Row label="Email" value={user?.email} icon={<Mail size={16} />} />
          </Section>

          {/* Password Security */}
          <Section title="Xavfsizlik" icon={<Lock size={20} />}>
            <form onSubmit={handleUpdatePassword} className="space-y-5">
              
              {/* Current Password Field */}
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Joriy parol</label>
                <div className="relative">
                  <input 
                    type={showCurrent ? "text" : "password"} 
                    value={passData.currentPassword} 
                    onChange={e => setPassData({...passData, currentPassword: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 transition-all"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowCurrent(!showCurrent)} 
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-500"
                  >
                    {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* New Password Field */}
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Yangi parol</label>
                <div className="relative">
                  <input 
                    type={showNew ? "text" : "password"} 
                    value={passData.newPassword} 
                    onChange={e => setPassData({...passData, newPassword: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 transition-all"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowNew(!showNew)} 
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-500"
                  >
                    {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={updating}
                className="w-full bg-indigo-600 text-white py-4.5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-500 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {updating ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {updating ? "Saqlanmoqda..." : "Saqlash"}
              </button>
            </form>
          </Section>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---
const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-[35px] p-8 border border-slate-100 shadow-sm">
    <div className="flex items-center gap-3 mb-8">
      <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">{icon}</div>
      <h3 className="font-black text-xl text-slate-800 tracking-tight">{title}</h3>
    </div>
    {children}
  </div>
);

const Row = ({ label, value, icon }) => (
  <div className="flex flex-col border-b border-slate-50 pb-4 mb-4 last:border-0">
    <div className="flex items-center gap-2 mb-1 text-slate-400 uppercase font-black text-[9px] tracking-widest">
      {icon} {label}
    </div>
    <p className="font-bold text-slate-700 text-sm pl-6">{value || "—"}</p>
  </div>
);

export default Profile;