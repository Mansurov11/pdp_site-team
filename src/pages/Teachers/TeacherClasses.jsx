import React from 'react';
import { Users, AlertTriangle, ChevronRight, GraduationCap } from 'lucide-react';

const MOCK_CLASSES = [
  { id: '1', name: "10-A", gradeLevel: 10, average: 8.4, students: 24, warnings: 2 },
  { id: '2', name: "9-B", gradeLevel: 9, average: 7.1, students: 18, warnings: 5 },
  { id: '3', name: "11-C", gradeLevel: 11, average: 9.2, students: 20, warnings: 0 },
];

export default function TeacherClasses() {
  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Sinflar</h1>
        <p className="text-slate-500 font-medium mt-1">Sizga biriktirilgan o'quv guruhlari</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_CLASSES.map((c) => (
          <div key={c.id} className="group bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="flex justify-between items-start mb-10">
              <div className="bg-indigo-50 text-indigo-600 p-4 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <GraduationCap size={28} />
              </div>
              <div className="text-right">
                <h2 className="text-4xl font-black text-slate-800">{c.name}</h2>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{c.gradeLevel}-SINF</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-slate-400">O'quvchilar</span>
                <span className="text-slate-800">{c.students} ta</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-slate-400">O'rtacha ball</span>
                <span className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">{c.average}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              {c.warnings > 0 ? (
                <span className="flex items-center gap-1 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black">
                  <AlertTriangle size={12} /> {c.warnings} OGOHLANTIRISH
                </span>
              ) : (
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Intizom a'lo</span>
              )}
              <ChevronRight className="text-slate-300 group-hover:text-indigo-600 transition-all" size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}