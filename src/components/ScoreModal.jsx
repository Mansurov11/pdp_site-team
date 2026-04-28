import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const ScoreModal = ({
  isOpen,
  onClose,
  student,   // raw row: { _id, studentId: { _id, fullName }, disciplineScore, ... }
  type,
  onSubmit,
  setSelectedPeople,
}) => {
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const tokenRef = useRef(localStorage.getItem("token"));
  const isPositive = type === "positive";

  // Extract real student ID and name from the nested studentId object
  const realStudentId = student?.studentId?._id;
  const studentName   = student?.studentId?.fullName ?? "—";

  const getRules = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://pdp-system-backend-1.onrender.com/api/v1/rules?sign=${type}`,
        { headers: { Authorization: `Bearer ${tokenRef.current}` } }
      );
      setRules(res.data.data || []);
    } catch (err) {
      console.error("Rules error:", err?.response?.data);
      toast.error("Qoidalarni yuklashda xatolik");
    }
  }, [type]);

  useEffect(() => {
    if (isOpen) {
      setSelectedRule(null);
      setReason("");
      getRules();
    }
  }, [isOpen, getRules]);

  const handleScoreSubmit = async () => {
    if (!selectedRule) return toast.warn("Qoidani tanlang");
    if (reason.trim().length < 10) return toast.warn("Kamida 10 belgi yozing");

    const payload = {
      studentId:   realStudentId,   // ✅ student.studentId._id
      ruleId:      selectedRule._id, // ✅ rule._id
      reason:      reason.trim(),
      evidenceUrl: "https://example.com",
    };

    setLoading(true);
    try {
      await axios.post(
        "https://pdp-system-backend-1.onrender.com/api/v1/transactions",
        payload,
        { headers: { Authorization: `Bearer ${tokenRef.current}` } }
      );

      onSubmit?.();
      setSelectedPeople?.(payload);
      toast.success("Transaction qo'shildi!");
      setSelectedRule(null);
      setReason("");
      onClose();
    } catch (err) {
      console.error("Transaction error:", err?.response?.data);
      toast.error(err.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const reasonCount  = reason.length;
  const reasonEnough = reasonCount >= 10;
  const counterText  = reasonEnough
    ? `✓ ${reasonCount} belgi`
    : `${10 - reasonCount} belgi qoldi`;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl p-6 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {isPositive ? "Bonus berish" : "Jarima berish"}
          </h2>
          <X
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
          />
        </div>

        {/* STUDENT */}
        <p>O'quvchi: <b>{studentName}</b></p>

        {/* RULES */}
        <div>
          <p className="font-semibold mb-3">Qoidani tanlang</p>
          <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
            {rules.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">
                Qoidalar topilmadi
              </p>
            )}
            {rules.map((rule) => {
              const isSelected = selectedRule?._id === rule._id;
              return (
                <div
                  key={rule._id}
                  onClick={() => setSelectedRule(rule)}
                  className={`border rounded-2xl p-4 cursor-pointer transition-all flex justify-between items-start ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="mt-1">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? "border-indigo-500" : "border-gray-400"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">{rule.title}</p>
                      <p className="text-sm text-gray-500">{rule.description}</p>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-bold flex-shrink-0 ${
                      isPositive
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {isPositive ? `+${rule.pointValue}` : rule.pointValue}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* REASON */}
        <div>
          <p className="font-semibold mb-2">Sabab (kamida 10 belgi)</p>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Batafsil sabab yozing..."
            className="w-full h-28 p-4 rounded-2xl bg-gray-100 outline-none resize-none"
          />
          <p className={`text-sm mt-1 transition-colors ${reasonEnough ? "text-green-500" : "text-gray-400"}`}>
            {counterText}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-gray-200 font-semibold disabled:opacity-50"
          >
            Bekor qilish
          </button>
          <button
            onClick={handleScoreSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-2xl text-white font-semibold disabled:opacity-60 transition-opacity ${
              isPositive ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {loading ? "Yuborilmoqda..." : "Tasdiqlash"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreModal;