import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, TrendingUp, Users, Award, Clock, ArrowUpRight, ArrowDownRight, AlertCircle } from "lucide-react";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const API_BASE = "https://pdp-system-backend-1.onrender.com/api/v1";

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("Token topilmadi. Iltimos, qaytadan kiring.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // 1. Fetch Teacher Profile
        const userRes = await axios.get(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = userRes.data?.data;
        setUser(userData);

        // 2. Fetch Transactions for this specific teacher
        const transRes = await axios.get(`${API_BASE}/transactions/teacher/${userData._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Handle nested data structures correctly
        const rawTrans = transRes.data?.data?.data || transRes.data?.data || [];
        setTransactions(Array.isArray(rawTrans) ? rawTrans : []);
        
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // --- Dynamic Data Processing ---
  const todayStr = new Date().toLocaleDateString();
  const currentMonth = new Date().getMonth();

  const dailyTrans = transactions.filter(t => new Date(t.createdAt).toLocaleDateString() === todayStr);
  const monthlyTrans = transactions.filter(t => new Date(t.createdAt).getMonth() === currentMonth);

  const stats = [
    {
      title: "Bugun bergan ballarim",
      value: dailyTrans.length,
      icon: <Calendar size={20} />,
    },
    { 
      title: "Bu oy", 
      value: monthlyTrans.length, 
      icon: <TrendingUp size={20} /> 
    },
    { 
      title: "Faol sinflarim", 
      value: user?.classes?.length || 0, 
      icon: <Users size={20} /> 
    },
    { 
      title: "Jami tranzaksiyalar", 
      value: transactions.length, 
      icon: <Award size={20} /> 
    },
  ];

  // Logic for the last 7 days chart
  const chartData = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateLabel = d.toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit' });
    const count = transactions.filter(t => 
      new Date(t.createdAt).toLocaleDateString() === d.toLocaleDateString()
    ).length;
    return { date: dateLabel, value: count };
  });

  const maxChartValue = Math.max(...chartData.map(d => d.value), 5);

  if (loading) return <Loader />;
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen text-red-500 font-bold gap-4">
      <AlertCircle size={48} />
      <p>{error}</p>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 bg-[#F8FAFC] min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Bosh sahifa</h1>
        <p className="text-slate-400 text-sm mt-1 font-bold uppercase tracking-widest">
          O'qituvchi: <span className="text-indigo-600">{user?.fullName || "Yuklanmoqda..."}</span>
        </p>
      </div>

      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all transform hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-tight max-w-[100px]">
                {item.title}
              </span>
              <div className="text-indigo-600 bg-indigo-50 p-3 rounded-2xl">
                {item.icon}
              </div>
            </div>
            <div className="text-4xl font-black text-slate-800 mt-4 tracking-tighter">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. Chart Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-black text-slate-800 mb-12">Haftalik faollik</h3>
          <div className="relative flex h-72 w-full border-b border-slate-100 ml-4 pr-4">
            <div className="flex-1 flex items-end gap-2 px-2">
              {chartData.map((bar, idx) => (
                <div
                  key={idx}
                  className="group relative flex-1 h-full flex flex-col items-center justify-end"
                  onMouseEnter={() => setHoveredBar(idx)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div
                    className="bg-indigo-600 w-full rounded-t-xl relative z-10 transition-all duration-700 ease-out group-hover:bg-indigo-400 shadow-indigo-100 shadow-lg"
                    style={{ height: `${(bar.value / maxChartValue) * 100}%` }}
                  >
                    {hoveredBar === idx && (
                      <div className="absolute left-1/2 -translate-x-1/2 -top-12 z-50 bg-slate-900 text-white px-3 py-2 rounded-xl text-[10px] font-black whitespace-nowrap shadow-2xl animate-bounce">
                        {bar.value} amal
                      </div>
                    )}
                  </div>
                  <span className="absolute -bottom-8 text-[10px] text-slate-400 font-black uppercase tracking-tighter">
                    {bar.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Dynamic Activities List */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black text-slate-800">Oxirgi amallar</h3>
            <div className="p-2 bg-slate-50 rounded-lg"><Clock size={16} className="text-slate-400" /></div>
          </div>
          <div className="space-y-6">
            {transactions.slice(0, 6).map((t, idx) => (
              <div key={t._id || idx} className="flex items-center gap-4 group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-transform group-hover:scale-110 ${
                  t.amount > 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                }`}>
                  {t.amount > 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 truncate">{t.studentId?.fullName || "O'quvchi"}</p>
                  <p className="text-[9px] text-slate-400 font-bold truncate uppercase tracking-widest">
                    {t.comment || (t.amount > 0 ? "Rag'batlantirildi" : "Intizomiy chora")}
                  </p>
                </div>
                <div className={`font-black text-sm ${t.amount > 0 ? "text-emerald-500" : "text-red-500"}`}>
                  {t.amount > 0 ? `+${t.amount}` : t.amount}
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-300 font-black uppercase text-[10px] tracking-widest">Hozircha ma'lumot yo'q</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;