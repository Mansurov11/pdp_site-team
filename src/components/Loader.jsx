import React from "react";
import { Loader2 } from "lucide-react";

const Loader = ({ title = "YUKLANMOQDA", subtitle = "Tizim tekshirilmoqda" }) => (
  <div className="h-screen flex items-center justify-center bg-[#F8FAFC] p-6">
    <div className="max-w-sm w-full bg-white p-10 rounded-[45px] border-2 border-white shadow-2xl shadow-indigo-100 flex flex-col items-center text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-indigo-100 rounded-3xl animate-ping opacity-20"></div>
        <div className="relative w-20 h-20 bg-indigo-600 rounded-[28px] flex items-center justify-center shadow-xl shadow-indigo-200">
          <Loader2 className="text-white animate-spin" size={32} strokeWidth={3} />
        </div>
      </div>
      <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-2 italic uppercase">{title}</h2>
      <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{subtitle}</p>
      </div>
    </div>
  </div>
);

export default Loader;