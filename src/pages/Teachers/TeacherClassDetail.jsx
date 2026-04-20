import React, { useState } from 'react';
import { Plus, Minus, Search, ArrowLeft, X } from 'lucide-react';
import { format } from 'date-fns';

export default function TeacherClassDetail() {
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState({ open: false, type: 'positive', student: null });
  const [reason, setReason] = useState('');

  // satisfies the 'format' import usage
  const lastUpdated = format(new Date(), 'dd.MM.yyyy HH:mm');

  const students = [
    { id: 1, name: 'Ali Valiyev', email: 'ali@school.uz', score: 9.2, bonus: 45 },
    { id: 2, name: 'Lola Karimova', email: 'lola@school.uz', score: 4.5, bonus: 12 },
    { id: 3, name: 'Aziz Omanov', email: 'aziz@school.uz', score: 7.8, bonus: 28 },
  ];

  const handleClose = () => { setModal({ open: false, type: 'positive', student: null }); setReason(''); };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 cursor-pointer hover:bg-slate-50">
            <ArrowLeft size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900">10-A Sinf</h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">So'nggi yangilanish: {lastUpdated}</p>
          </div>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" placeholder="O'quvchi qidirish..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none shadow-sm"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="p-6 text-xs font-black text-slate-400 uppercase">O'quvchi</th>
              <th className="p-6 text-xs font-black text-slate-400 uppercase text-center">Intizom</th>
              <th className="p-6 text-xs font-black text-slate-400 uppercase text-center">Bonus</th>
              <th className="p-6 text-xs font-black text-slate-400 uppercase text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {students.filter(s => s.name.toLowerCase().includes(search.toLowerCase())).map(s => (
              <tr key={s.id} className="hover:bg-slate-50/50">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs">{s.name[0]}</div>
                    <p className="font-bold text-slate-800">{s.name}</p>
                  </div>
                </td>
                <td className="p-6 text-center font-black text-xl text-slate-700">{s.score}</td>
                <td className="p-6 text-center font-bold text-indigo-600">+{s.bonus}</td>
                <td className="p-6">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setModal({ open: true, type: 'positive', student: s })} className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Plus size={18}/></button>
                    <button onClick={() => setModal({ open: true, type: 'negative', student: s })} className="p-3 bg-rose-50 text-rose-600 rounded-xl"><Minus size={18}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal.open && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden">
            <div className={`p-8 text-white ${modal.type === 'positive' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-black">{modal.student.name}</h2>
                <X className="cursor-pointer" onClick={handleClose} />
              </div>
            </div>
            <div className="p-8 space-y-6">
              <textarea 
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none"
                placeholder="Sababni kiriting..."
                value={reason} onChange={(e) => setReason(e.target.value)}
              />
              <button onClick={handleClose} className={`w-full py-4 rounded-2xl font-black text-white shadow-lg ${modal.type === 'positive' ? 'bg-emerald-500' : 'bg-rose-500'}`}>TASDIQLASH</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}