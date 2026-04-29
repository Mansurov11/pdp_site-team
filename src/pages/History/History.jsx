import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  Undo2, TrendingUp, TrendingDown, Clock,
  User as UserIcon, Download, FileText, RotateCcw, X,
} from "lucide-react";
import * as XLSX from "xlsx";

const Students = () => {
  const token = localStorage.getItem("token");
  const [transactions, setTransactions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getId() {
    try {
      const res = await axios.get(
        "https://pdp-system-backend-1.onrender.com/api/v1/auth/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      getTransactions(res.data.data._id);
    } catch (err) {
      console.error("Auth Error:", err);
      setLoading(false);
    }
  }

  async function getTransactions(id) {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://pdp-system-backend-1.onrender.com/api/v1/transactions/teacher/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = res.data?.data?.data ?? res.data?.data ?? [];
      setTransactions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { getId(); }, []);

  const handleRevoke = async (id, reason) => {
    try {
      await axios.post(
        `https://pdp-system-backend-1.onrender.com/api/v1/transactions/${id}/revoke`,
        { reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Muvaffaqiyatli bekor qilindi");
      setOpenModal(false);
      getId();
    } catch (err) {
      const msg = err.response?.data?.message ?? "Xatolik yuz berdi";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    }
  };

  const handleExport = () => {
    if (transactions.length === 0) return;
    const exportData = transactions.map((item) => ({
      "O'quvchi": item.studentId?.fullName ?? "---",
      "Sabab/Qoida": item.ruleId?.title ?? "---",
      "Izoh": item.reason ?? "---",
      "Ball": item.pointChange,
      "Sana": new Date(item.createdAt).toLocaleString(),
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tarix");
    XLSX.writeFile(workbook, `Tarix_${new Date().toLocaleDateString()}.xlsx`);
  };

  if (loading) return <Loader />;

  return (
    <main className="min-h-screen bg-[#F8F9FB] p-4 md:p-6 font-sans antialiased text-[#2D3139]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Tarixim</h1>
            <p className="text-sm font-medium text-gray-400">O'qituvchi faoliyat tarixi</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 pr-4 md:pr-6 rounded-2xl shadow-sm border border-gray-100 self-start sm:self-auto">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <UserIcon size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Ustoz</p>
              <h2 className="font-bold text-sm md:text-base">{transactions[0]?.teacherId?.fullName ?? "Ustoz"}</h2>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <StatCard icon={<FileText size={18} />}     color="indigo"  label="Jami"     value={transactions.length} unit="tr" />
          <StatCard icon={<TrendingUp size={18} />}   color="emerald" label="Ijobiy"   value={transactions.filter(t => t.pointChange > 0 && !t.isRevoked).length} unit="ta" />
          <StatCard icon={<TrendingDown size={18} />} color="rose"    label="Salbiy"   value={transactions.filter(t => t.pointChange < 0 && !t.isRevoked).length} unit="ta" />
          <StatCard icon={<RotateCcw size={18} />}    color="amber"   label="Bekorlar" value={transactions.filter(t => t.isRevoked).length} unit="ta" />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5 md:mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">Harakatlar tarixi</h1>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 text-indigo-600 transition-all active:scale-95 self-start sm:self-auto"
          >
            <Download size={16} /> Excelga yuklash
          </button>
        </div>

        {/* Table — desktop */}
        <div className="hidden md:block overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="grid grid-cols-12 border-b border-gray-50 bg-gray-50/50 px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">
            <div className="col-span-3">O'quvchi</div>
            <div className="col-span-3">Sabab</div>
            <div className="col-span-3">Izoh</div>
            <div className="col-span-1 text-center">Ball</div>
            <div className="col-span-2 text-right">Amal</div>
          </div>
          <ul className="divide-y divide-gray-50">
            {transactions.map((t, idx) => (
              <li
                key={t._id ?? idx}
                className={`grid grid-cols-12 items-center px-8 py-5 transition-colors ${t.isRevoked ? "opacity-50 grayscale" : "hover:bg-gray-50/80"}`}
              >
                <div className="col-span-3 flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF2FF] text-[#4F46E5] font-bold text-sm uppercase">
                    {t.studentId?.fullName?.charAt(0)}
                  </div>
                  <h4 className="font-bold text-[15px]">{t.studentId?.fullName}</h4>
                </div>
                <div className="col-span-3">
                  <span className="font-bold text-[15px] block">{t.ruleId?.title}</span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                    <Clock size={12} /> {new Date(t.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="col-span-3 text-sm text-gray-500 italic pr-4">{t.reason ?? "Izohsiz"}</div>
                <div className="col-span-1 flex justify-center">
                  <div className={`px-3 py-1 rounded-xl font-bold text-sm ${t.pointChange < 0 ? "bg-red-50 text-red-500" : "bg-green-50 text-green-500"}`}>
                    {t.pointChange > 0 ? `+${t.pointChange}` : t.pointChange}
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  {t.isRevoked ? (
                    <span className="text-xs font-bold text-gray-400">Bekor qilindi</span>
                  ) : (
                    <button
                      onClick={() => { setActiveTransaction(t); setOpenModal(true); }}
                      className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-600 transition-all hover:bg-amber-50"
                    >
                      <Undo2 size={16} /> Bekor qilish
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Cards — mobile */}
        <div className="md:hidden flex flex-col gap-3">
          {transactions.map((t, idx) => (
            <div
              key={t._id ?? idx}
              className={`bg-white rounded-2xl border border-gray-100 p-4 shadow-sm ${t.isRevoked ? "opacity-50 grayscale" : ""}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF2FF] text-[#4F46E5] font-bold text-sm uppercase">
                    {t.studentId?.fullName?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.studentId?.fullName}</p>
                    <p className="text-xs text-gray-400">{new Date(t.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-xl font-bold text-sm ${t.pointChange < 0 ? "bg-red-50 text-red-500" : "bg-green-50 text-green-500"}`}>
                  {t.pointChange > 0 ? `+${t.pointChange}` : t.pointChange}
                </div>
              </div>
              <p className="text-sm font-bold text-gray-700 mb-1">{t.ruleId?.title}</p>
              <p className="text-xs text-gray-400 italic mb-3">{t.reason || "Izohsiz"}</p>
              <div className="flex justify-end">
                {t.isRevoked ? (
                  <span className="text-xs font-bold text-gray-400">Bekor qilindi</span>
                ) : (
                  <button
                    onClick={() => { setActiveTransaction(t); setOpenModal(true); }}
                    className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-3 py-2 text-xs font-bold text-amber-600 hover:bg-amber-50"
                  >
                    <Undo2 size={14} /> Bekor qilish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {openModal && (
          <Modal data={activeTransaction} setOpenModal={setOpenModal} onConfirm={handleRevoke} />
        )}
      </div>
    </main>
  );
};

function StatCard({ icon, color, label, value, unit }) {
  const colorMap = {
    indigo:  "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    rose:    "bg-rose-50 text-rose-600",
    amber:   "bg-amber-50 text-amber-600",
  };
  return (
    <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 md:gap-4">
      <div className={`h-10 w-10 md:h-12 md:w-12 rounded-xl flex items-center justify-center shrink-0 ${colorMap[color]}`}>{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-lg md:text-xl font-black">{value} <span className="text-[10px] font-medium text-gray-300 uppercase">{unit}</span></p>
      </div>
    </div>
  );
}

function Modal({ data, setOpenModal, onConfirm }) {
  const [reason, setReason] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full sm:max-w-md bg-white p-6 md:p-8 rounded-t-[32px] sm:rounded-[32px] shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
            <RotateCcw size={22} />
          </div>
          <button onClick={() => setOpenModal(false)} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <h3 className="mb-4 text-xl md:text-2xl font-black text-gray-900">Bekor qilish</h3>
        <div className="space-y-3 mb-6 md:mb-8">
          <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100 text-sm">
            <p className="font-bold text-gray-800">{data?.studentId?.fullName}</p>
            <p className="text-gray-500">{data?.ruleId?.title} ({data?.pointChange} ball)</p>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Sabab (Majburiy)</label>
            <textarea
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:border-indigo-500 outline-none transition-all"
              placeholder="Nima uchun bekor qilyapsiz?"
              rows="3"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={() => onConfirm(data._id, reason)}
          disabled={!reason.trim()}
          className="w-full rounded-2xl bg-gray-900 py-4 font-bold text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Tasdiqlash
        </button>
      </div>
    </div>
  );
}

export default Students;