import React, { useState } from "react";
import { Calendar, TrendingUp, Users, Award } from "lucide-react";

const Statistics = () => {
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



  return (
    <div className="w-full max-w-400 mx-auto p-2">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Statistika</h1>
        <p className="text-gray-400 text-sm mt-1 font-medium">O'qituvchi statistikasi paneli</p>
      </div>

      {/* 1. Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-33.75 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-gray-500 text-[13px] font-medium leading-tight max-w-30">{item.title}</span>
              <div className="text-indigo-600 bg-indigo-50 p-2 rounded-lg">{item.icon}</div>
            </div>
            <div className="text-3xl font-bold text-gray-800">{item.value}</div>
          </div>
        ))}
      </div>

      {/* 2. Weekly Activity Chart Section */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm w-full mb-8">
        <h3 className="text-[16px] font-bold text-gray-800 mb-12">Haftalik faollik</h3>

        <div className="relative flex h-95 w-full border-b border-gray-300 ml-8">
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
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-1/2 z-50 bg-white border border-gray-100 shadow-2xl p-3 rounded-sm min-w-25 pointer-events-none">
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
      
    </div>
  );
};

export default Statistics;