import React, { useMemo } from 'react';
import { Award, Users, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function TeacherDashboard() {
  const chartData = useMemo(() => [
    { name: 'Du', ballar: 45 }, { name: 'Se', ballar: 52 },
    { name: 'Ch', ballar: 38 }, { name: 'Pa', ballar: 65 },
    { name: 'Ju', ballar: 48 }, { name: 'Sh', ballar: 20 },
    { name: 'Ya', ballar: 15 },
  ], []);

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Bosh sahifa</h1>
        <p className="text-slate-500 font-medium">Tizimdagi umumiy holat</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Bugun berilgan", value: "128", icon: <Calendar />, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Oylik ballar", value: "1,240", icon: <TrendingUp />, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Sinflar", value: "4", icon: <Users />, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Mening o'rnim", value: "#3", icon: <Award />, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black mt-1 text-slate-800">{stat.value}</p>
            </div>
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-8">Haftalik faollik ko'rsatkichi</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 600}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 600}} />
              <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="ballar" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}