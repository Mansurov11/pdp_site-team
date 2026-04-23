import React, { useState, useEffect } from "react";
import { Calendar, TrendingUp, Users, Award, Clock } from "lucide-react";
import axios from "axios";
import Loader from "../../components/Loader";

const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ stats: [], chartData: [], activities: [] });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const userRaw = localStorage.getItem("user");
        
        if (!userRaw || !token) {
          setLoading(false);
          return;
        }

        const user = JSON.parse(userRaw);
        const teacherId = user?._id || user?.id;

        if (!teacherId) return setLoading(false);

        const res = await axios.get(`https://pdp-system-backend-1.onrender.com/api/v1/stats/teacher/${teacherId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const apiData = res.data?.data || res.data || {};
        
        const formattedStats = [
          { title: "Bugun berilgan ballarim", value: apiData.todayPoints ?? "0", icon: <Calendar size={18} /> },
          { title: "Bu oy", value: apiData.monthlyPoints ?? "0", icon: <TrendingUp size={18} /> },
          { title: "Faol sinflarim", value: apiData.activeClassesCount ?? "0", icon: <Users size={18} /> },
          { title: "Jami tranzaksiyalar", value: apiData.totalTransactions ?? "0", icon: <Award size={18} /> },
        ];

        setData({
          stats: formattedStats,
          chartData: Array.isArray(apiData.weeklyActivity) ? apiData.weeklyActivity : [],
          activities: Array.isArray(apiData.recentActivities) ? apiData.recentActivities : []
        });
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;

  const chartValues = data.chartData.map(d => d.value || 0);
  const maxVal = Math.max(...chartValues, 5);

  return (
    <div className="px-5 md:px-8 font-sans text-slate-800 mb-10">
      {/* Header */}
      <div className="mb-8">
        <h4 className="text-3xl font-bold text-slate-900 tracking-tight">Statistika</h4>
        <p className="text-slate-500 font-medium">Faoliyat tahlili va natijalar</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {data.stats.map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-36 hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-tight w-24">
                {item.title}
              </span>
              <div className="text-indigo-600 bg-indigo-50 p-2 rounded-lg">
                {item.icon}
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Weekly Activity Chart */}
        <div className="xl:col-span-2 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-12 uppercase tracking-wide">Haftalik faollik</h3>
          
          <div className="relative flex h-72 w-full border-b border-slate-100 ml-6 pr-4">
            {/* Y-Axis Labels */}
            <div className="absolute -left-10 h-full flex flex-col justify-between text-[11px] font-bold text-slate-300 py-1">
              <span>{maxVal}</span>
              <span>{Math.floor(maxVal / 2)}</span>
              <span>0</span>
            </div>

            {/* Bars Container - Constrained for Thickness */}
            <div className="flex-1 flex items-end justify-center">
              <div className="flex items-end justify-around gap-3 md:gap-6 w-full max-w-3xl h-full px-4">
                {data.chartData.length > 0 ? data.chartData.map((bar, idx) => (
                  <div key={idx} className="group relative flex-1 flex flex-col items-center max-w-[50px]">
                    
                    {/* Tooltip */}
                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded-lg mb-2 pointer-events-none whitespace-nowrap z-20 shadow-xl transform translate-y-2 group-hover:translate-y-0">
                      {bar.value || 0} ball
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45" />
                    </div>

                    {/* Bar */}
                    <div 
                      className="bg-indigo-500 w-full rounded-t-xl
                                 hover:bg-indigo-400 cursor-pointer shadow-sm
                                 transition-all duration-500 ease-out transform origin-bottom 
                                 hover:scale-x-105 hover:shadow-indigo-200 hover:shadow-lg" 
                      style={{ 
                        height: `${((bar.value || 0) / maxVal) * 100}%`,
                        animation: `growUp 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.1}s both` 
                      }} 
                    />
                    
                    {/* X-Axis Label */}
                    <span className="absolute -bottom-8 text-[10px] font-bold text-slate-400 uppercase tracking-tighter text-center">
                      {bar.date}
                    </span>
                  </div>
                )) : (
                  <p className="text-slate-300 font-bold text-xs uppercase self-center">Ma'lumot mavjud emas</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-8 uppercase tracking-wide">So'nggi amallar</h3>
          <div className="space-y-6">
            {data.activities.length > 0 ? data.activities.slice(0, 5).map((act, i) => (
              <div key={i} className="flex justify-between items-center group">
                <div className="flex items-center gap-4">
                   <div className={`w-3 h-3 rounded-full shrink-0 ${act.type === 'positive' ? 'bg-emerald-500 shadow-emerald-100' : 'bg-rose-500 shadow-rose-100'} shadow-lg`} />
                   <div>
                      <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{act.studentName}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-tight">{act.date}</p>
                   </div>
                </div>
                <p className={`text-sm font-black tracking-tighter ${act.type === 'positive' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {act.type === 'positive' ? '+' : '-'}{act.points}
                </p>
              </div>
            )) : (
              <p className="text-slate-300 font-bold text-xs uppercase text-center py-10">Ma'lumot yo'q</p>
            )}
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes growUp {
          from { transform: scaleY(0); opacity: 0; }
          to { transform: scaleY(1); opacity: 1; }
        }
      `}} />
    </div>
  );
};

export default Statistics;