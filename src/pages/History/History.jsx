import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader"; // O'sha biz yaratgan Loader
import "./History.css";
import {
  Undo2,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Clock,
  User as UserIcon,
  Search,
  Download,
  FileText,
  RotateCcw,
} from "lucide-react";
import * as XLSX from "xlsx";

const Students = () => {
  const token = localStorage.getItem("token");
  const [transactions, setTransactions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  
  

  async function getId() {
    try {
      const res = await axios.get(
        "https://pdp-system-backend-1.onrender.com/api/v1/auth/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      getTransactions(res.data.data._id);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  async function getTransactions(id) {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://pdp-system-backend-1.onrender.com/api/v1/transactions/teacher/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTransactions(res.data.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getId();
  }, []);

  const handleExport = () => {
    if (transactions.length === 0) return;

    // Ma'lumotlarni Excel formatiga tayyorlash
    const exportData = transactions.map((item) => ({
      "O'quvchi": item.studentId?.fullName || "---",
      "Sabab/Qoida": item.ruleId?.title || "---",
      "Izoh": item.reason || "---",
      "Ball": item.pointChange,
      "Sana": new Date(item.createdAt || Date.now()).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tranzaksiyalar");

    XLSX.writeFile(workbook, `Tarix_${new Date().toLocaleDateString()}.xlsx`);
  };

   if (loading) return <Loader />

  return (
    <main className="min-h-screen bg-[#F8F9FB] p-6 font-sans antialiased text-[#2D3139]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tarixim</h1>
            <p className="text-sm font-medium text-gray-400">
              O'qituvchi faoliyat tarixi
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 pr-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <UserIcon size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Ustoz
              </p>
              <h2 className="font-bold">
                {transactions[0]?.teacherId?.fullName || "Foydalanuvchi"}
              </h2>
            </div>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<FileText size={20} />}
            color="indigo"
            label="Jami"
            value={transactions.length}
            unit="tr"
          />
          <StatCard
            icon={<TrendingUp size={20} />}
            color="emerald"
            label="Ijobiy"
            value={transactions.filter((t) => t.pointChange > 0).length}
            unit="ta"
          />
          <StatCard
            icon={<TrendingDown size={20} />}
            color="rose"
            label="Salbiy"
            value={transactions.filter((t) => t.pointChange < 0).length}
            unit="ta"
          />
          <StatCard
            icon={<RotateCcw size={20} />}
            color="amber"
            label="Bekorlar"
            value="0"
            unit="ta"
          />
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Harakatlar tarixi
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Barcha ball tranzaksiyalari
            </p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 active:scale-95 transition-all text-indigo-600"
          >
            <Download size={16} /> Excelga yuklash
          </button>
        </div>

        {/* List Section */}
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
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
                key={idx}
                className="grid grid-cols-12 items-center px-8 py-5 transition-colors hover:bg-gray-50/80"
              >
                <div className="col-span-3 flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF2FF] text-[#4F46E5] font-bold text-sm uppercase">
                    {t.studentId?.fullName
                      ?.split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <h4 className="font-bold text-[15px]">
                      {t.studentId?.fullName}
                    </h4>
                    <p className="text-xs text-gray-400 font-medium">Sinf: --</p>
                  </div>
                </div>

                <div className="col-span-3 flex flex-col gap-1">
                  <span className="font-bold text-[15px]">
                    {t.ruleId?.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                      <Clock size={12} /> 12.04 08:30
                    </span>
                  </div>
                </div>

                <div className="col-span-3 pr-4">
                  <p className="line-clamp-2 text-sm text-gray-500 italic leading-relaxed">
                    {t.reason || "Izoh mavjud emas"}
                  </p>
                </div>

                <div className="col-span-1 flex justify-center">
                  <div
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-2 font-bold ${
                      t.pointChange < 0
                        ? "bg-red-50 text-red-500"
                        : "bg-green-50 text-green-500"
                    }`}
                  >
                    {t.pointChange > 0 ? `+${t.pointChange}` : t.pointChange}
                  </div>
                </div>

                <div className="col-span-2 text-right">
                  {idx < 4 ? (
                    <button
                      onClick={() => {
                        setActiveTransaction(t);
                        setOpenModal(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-600 shadow-sm transition-all hover:bg-amber-50"
                    >
                      <Undo2 size={16} /> Bekor qilish
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-2 text-sm font-bold text-gray-300">
                      <CheckCircle2 size={16} /> Yakunlandi
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {openModal && (
          <Modal data={activeTransaction} setOpenModal={setOpenModal} />
        )}
      </div>
    </main>
  );
};

/* --- StatCard Component --- */
function StatCard({ icon, color, label, value, unit }) {
  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
      <div
        className={`h-12 w-12 rounded-xl flex items-center justify-center ${colorMap[color]}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-xl font-black">
          {value}{" "}
          <span className="text-[10px] font-medium text-gray-300 uppercase">
            {unit}
          </span>
        </p>
      </div>
    </div>
  );
}

/* --- Modal Component --- */
function Modal({ data, setOpenModal }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1D23]/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-4xl shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
            <Search size={24} />
          </div>
          <button
            onClick={() => setOpenModal(false), setSelectedTransactionId(data.data._id)}
            className="text-2xl text-gray-400"
          >
            &times;
          </button>
        </div>
        <h3 className="mb-2 text-2xl font-black text-gray-900">
          Amal tafsilotlari
        </h3>
        <div className="space-y-4 mb-8">
          <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase">Qoida</p>
            <p className="font-bold text-gray-800">{data?.ruleId?.title}</p>
          </div>
          <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase">Izoh</p>
            <p className="text-sm text-gray-600 italic">
              "{data?.reason || "Harakatchan o'quvchi"}"
            </p>
          </div>
        </div>
        <button
          onClick={() => setOpenModal(false)}
          className="w-full rounded-2xl bg-gray-900 py-4 font-bold text-white transition-transform active:scale-95"
        >
          Yopish
        </button>
      </div>
    </div>
  );
}

export default Students;