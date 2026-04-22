import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Award, TrendingUp, Users, Star, Crown } from 'lucide-react';

export default function TeacherDashboard() {
  const [stats, setStats] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        
        // 1. Fetch Teacher Stats
        const statsRes = await axios.get(`https://pdp-system-backend-1.onrender.com/api/v1/stats/teacher/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // 2. Fetch Leaderboard
        const leaderRes = await axios.get(`https://pdp-system-backend-1.onrender.com/api/v1/stats/leaderboard/teachers`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setStats(statsRes.data?.data || statsRes.data);
        setLeaderboard(leaderRes.data?.data || leaderRes.data || []);
      } catch (err) {
        console.error("Dashboard data error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-10 font-black text-slate-400 animate-pulse">Yuklanmoqda...</div>;

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Boshqaruv Paneli</h1>
        <p className="text-slate-500 font-bold">Xush kelibsiz! Bugungi ko'rsatkichlaringiz bilan tanishing.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4"><Star size={24}/></div>
          <p className="text-slate-400 font-bold text-xs uppercase">Reyting Ballingiz</p>
          <h2 className="text-4xl font-black text-slate-800">{stats?.totalPoints || 0}</h2>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4"><Users size={24}/></div>
          <p className="text-slate-400 font-bold text-xs uppercase">O'quvchilar Soni</p>
          <h2 className="text-4xl font-black text-slate-800">{stats?.studentCount || 0}</h2>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4"><TrendingUp size={24}/></div>
          <p className="text-slate-400 font-bold text-xs uppercase">Faollik Darajasi</p>
          <h2 className="text-4xl font-black text-slate-800">{stats?.activityLevel || "A+"}</h2>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center gap-3">
          <Crown className="text-amber-500" />
          <h2 className="text-2xl font-black text-slate-800">Top Ustozlar</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-6 text-xs font-black text-slate-400 uppercase">O'rin</th>
                <th className="p-6 text-xs font-black text-slate-400 uppercase">Ustoz</th>
                <th className="p-6 text-xs font-black text-slate-400 uppercase text-right">Ball</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {leaderboard.map((teacher, index) => (
                <tr key={teacher._id} className="hover:bg-slate-50/50">
                  <td className="p-6">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black ${index === 0 ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="p-6 font-bold text-slate-800">{teacher.name}</td>
                  <td className="p-6 text-right font-black text-indigo-600">{teacher.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}