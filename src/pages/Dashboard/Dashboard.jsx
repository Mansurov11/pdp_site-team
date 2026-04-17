import React, { useState } from "react";
import { Calendar, TrendingUp, Users, Award } from "lucide-react";

const Dashboard = () => {
  const [hoveredBar, setHoveredBar] = useState(null);

  const stats = [
    { title: "Bugun bergan ballarim", value: "0", icon: <Calendar size={20} /> },
    { title: "Bu oy", value: "11", icon: <TrendingUp size={20} /> },
    { title: "Faol sinflarim", value: "2", icon: <Users size={20} /> },
    { title: "Jami tranzaksiyalar", value: "5", icon: <Award size={20} /> },
  ];

  const chartData = [
    { date: "11.04", value: 0 },
    { date: "12.04", value: 3 },
    { date: "13.04", value: 2 },
    { date: "14.04", value: 2 },
    { date: "15.04", value: 1 },
    { date: "16.04", value: 0 },
    { date: "17.04", value: 0 },
  ];

  const activities = [
    {
      name: "Alisher Karimov",
      action: "Darsga kechikish",
      desc: "Ertalabki darsga 10 daqiqa kechikdi",
      score: "-1",
      date: "15.04.2026 08:15",
      initials: "AK",
      type: "negative",
    },
    {
      name: "Alisher Karimov",
      action: "Maktab tadbirida faol ishtirok",
      desc: "Maktab tanlovida faol qatnashdi va yaxshi natija ko'rsatdi",
      score: "+2",
      date: "14.04.2026 14:30",
      initials: "AK",
      type: "positive",
    },
    {
      name: "Nigora Rashidova",
      action: "Darsda telefondan foydalanish",
      desc: "Matematika darsida telefonda o'yin o'ynadi",
      score: "-2",
      date: "13.04.2026 11:20",
      initials: "NR",
      type: "negative",
    },
    {
      name: "Zarina Turgunova",
      action: "Sinfdoshga zo'ravonlik",
      desc: "Sinfdoshini jabrlab, mobaynida nizo bo'ldi",
      score: "-3",
      date: "12.04.2026 13:00",
      initials: "ZT",
      type: "negative",
    },
    {
      name: "Madina Yusupova",
      action: "A'lo baholar (chorak)",
      desc: "Barcha fanlarda a'lo natijalar",
      score: "+3",
      date: "10.04.2026 10:00",
      initials: "MY",
      type: "positive",
    },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto p-2">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Bosh sahifa</h1>
        <p className="text-gray-400 text-sm mt-1 font-medium">O'qituvchi paneli</p>
      </div>

      {/* 1. Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-[135px] flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-gray-500 text-[13px] font-medium leading-tight max-w-[120px]">{item.title}</span>
              <div className="text-indigo-600 bg-indigo-50 p-2 rounded-lg">{item.icon}</div>
            </div>
            <div className="text-3xl font-bold text-gray-800">{item.value}</div>
          </div>
        ))}
      </div>

      {/* 2. Weekly Activity Chart Section */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm w-full mb-8">
        <h3 className="text-[16px] font-bold text-gray-800 mb-12">Haftalik faollik</h3>

        <div className="relative flex h-[380px] w-full border-b border-gray-300 ml-8">
          {/* Y-Axis Labels */}
          <div className="absolute -left-14 h-full flex flex-col justify-between text-[13px] text-gray-400 pb-1 text-right w-10">
            <span>3</span>
            <span>2.25</span>
            <span>1.5</span>
            <span>0.75</span>
            <span className="translate-y-1">0</span>
          </div>

          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2, 3, 4].map((v) => (
              <div key={v} className="w-full border-t border-gray-50 h-0" />
            ))}
          </div>

          {/* Bars Area */}
          <div className="flex-1 flex items-end">
            {chartData.map((bar, idx) => (
              <div 
                key={idx} 
                className="group relative flex-1 h-full flex flex-col items-center justify-end px-1"
                onMouseEnter={() => setHoveredBar(idx)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Gray Hover Background */}
                <div className="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity z-0" />

                {/* The Blue Bar */}
                <div 
                  className="bg-[#5b52f0] w-full rounded-t-lg relative z-10 transition-all duration-300"
                  style={{ height: `${(bar.value / 3) * 100}%` }}
                >
                  {/* Tooltip */}
                  {hoveredBar === idx && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-1/2 z-50 bg-white border border-gray-100 shadow-2xl p-3 rounded-sm min-w-[100px] pointer-events-none">
                      <p className="text-gray-500 text-[11px] mb-1">{bar.date}</p>
                      <p className="text-[#5b52f0] text-[13px] font-bold whitespace-nowrap">ballar : {bar.value}</p>
                    </div>
                  )}
                </div>

                {/* X-Axis Date */}
                <span className="absolute -bottom-8 text-xs text-gray-400 font-medium">{bar.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Recent Activity Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-10">
        <div className="p-6 border-b border-gray-50">
          <h3 className="text-[17px] font-bold text-gray-800">So'nggi faoliyat</h3>
        </div>

        <div className="flex flex-col">
          {activities.map((item, index) => (
            <div 
              key={index} 
              className="flex items-start justify-between p-6 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex gap-4">
                {/* Avatar Initials */}
                <div className="w-11 h-11 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#818CF8] text-[13px] font-bold shrink-0">
                  {item.initials}
                </div>
                
                {/* Content */}
                <div>
                  <h4 className="text-[15px] font-bold text-gray-800 leading-tight">{item.name}</h4>
                  <p className="text-[14px] text-gray-500 mt-1">{item.action}</p>
                  <p className="text-[12px] text-gray-400 mt-3 font-medium">{item.desc}</p>
                </div>
              </div>

              {/* Right side: Badge and Date */}
              <div className="flex flex-col items-end justify-between min-h-[70px]">
                <span className={`px-4 py-1 rounded-full text-[13px] font-bold ${
                  item.type === "positive" 
                    ? "bg-[#F0FDF4] text-[#22C55E]" 
                    : "bg-[#FEF2F2] text-[#F87171]"
                }`}>
                  {item.score}
                </span>
                <span className="text-[11px] text-gray-400 mt-auto font-medium">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;