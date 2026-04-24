import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Undo2,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  FileText,
  RotateCcw,
  Download,
  User as UserIcon,
  AlertTriangle,
  X,
  Clock,
} from "lucide-react";
import * as XLSX from "xlsx";

const BASE = "https://pdp-system-backend-1.onrender.com/api/v1";

/* ── Helpers ───────────────────────────────────────────── */

function initials(name = "") {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Returns true if the transaction is within 24 hours */
function isWithin24h(iso) {
  if (!iso) return false;
  return Date.now() - new Date(iso).getTime() < 24 * 60 * 60 * 1000;
}

/* ── Main Component ────────────────────────────────────── */

const History = () => {
  const token = localStorage.getItem("token");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revoking, setRevoking] = useState(null); // id being revoked
  const [confirmModal, setConfirmModal] = useState(null); // transaction to confirm
  const [toast, setToast] = useState(null);

  async function getId() {
    try {
      const res = await axios.get(`${BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchTransactions(res.data.data._id);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  async function fetchTransactions(id) {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE}/transactions/teacher/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  /* Revoke a transaction */
  async function handleRevoke(t) {
    setRevoking(t._id);
    try {
      await axios.post(
        `${BASE}/transactions/${t._id}/revoke`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransactions((prev) =>
        prev.map((tx) =>
          tx._id === t._id ? { ...tx, status: "revoked" } : tx
        )
      );
      showToast("Tranzaksiya bekor qilindi", "success");
    } catch (err) {
      const msg = err.response?.data?.message || "Xatolik yuz berdi";
      showToast(msg, "error");
    } finally {
      setRevoking(null);
      setConfirmModal(null);
    }
  }

  function showToast(message, type) {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }

  /* Excel export */
  function handleExport() {
    if (!transactions.length) return;
    const rows = transactions.map((t) => ({
      "O'quvchi": t.studentId?.fullName || "—",
      Sabab: t.ruleId?.title || "—",
      Izoh: t.reason || "—",
      Ball: t.pointChange,
      Status: t.status || "active",
      Sana: formatDate(t.createdAt),
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tarix");
    XLSX.writeFile(wb, `Tarix_${new Date().toLocaleDateString()}.xlsx`);
  }

  /* Derived stats */
  const positive = transactions.filter((t) => t.pointChange > 0).length;
  const negative = transactions.filter((t) => t.pointChange < 0).length;
  const revoked = transactions.filter((t) => t.status === "revoked").length;
  const teacherName =
    transactions[0]?.teacherId?.fullName || "Foydalanuvchi";

  if (loading) {
    return (
      <div style={S.loadingScreen}>
        <div style={S.spinner} />
      </div>
    );
  }

  return (
    <main style={S.page}>
      <div style={S.container}>
        {/* ── Header ── */}
        <header style={S.header}>
          <div>
            <p style={S.eyebrow}>O'qituvchi paneli</p>
            <h1 style={S.pageTitle}>Faoliyat tarixi</h1>
          </div>
          <div style={S.teacherPill}>
            <div style={S.teacherAvatar}>
              <UserIcon size={18} color="#4F46E5" />
            </div>
            <div>
              <p style={S.teacherRole}>Ustoz</p>
              <p style={S.teacherName}>{teacherName}</p>
            </div>
          </div>
        </header>

        {/* ── Stats ── */}
        <div style={S.statsGrid}>
          <StatCard
            icon={<FileText size={18} />}
            label="Jami"
            value={transactions.length}
            unit="ta"
            accent="#4F46E5"
            bg="#EEF2FF"
          />
          <StatCard
            icon={<TrendingUp size={18} />}
            label="Ijobiy"
            value={positive}
            unit="ta"
            accent="#059669"
            bg="#ECFDF5"
          />
          <StatCard
            icon={<TrendingDown size={18} />}
            label="Salbiy"
            value={negative}
            unit="ta"
            accent="#E11D48"
            bg="#FFF1F2"
          />
          <StatCard
            icon={<RotateCcw size={18} />}
            label="Bekor qilingan"
            value={revoked}
            unit="ta"
            accent="#D97706"
            bg="#FFFBEB"
          />
        </div>

        {/* ── Toolbar ── */}
        <div style={S.toolbar}>
          <div>
            <h2 style={S.sectionTitle}>Barcha tranzaksiyalar</h2>
            <p style={S.sectionSub}>{transactions.length} ta yozuv</p>
          </div>
          <button style={S.exportBtn} onClick={handleExport}>
            <Download size={15} />
            Excel
          </button>
        </div>

        {/* ── Table ── */}
        <div style={S.tableCard}>
          {/* Table header */}
          <div style={S.tableHead}>
            <span style={{ ...S.th, flex: "2" }}>O'quvchi</span>
            <span style={{ ...S.th, flex: "2" }}>Sabab / Vaqt</span>
            <span style={{ ...S.th, flex: "2.5" }}>Izoh</span>
            <span style={{ ...S.th, flex: "0.8", textAlign: "center" }}>Ball</span>
            <span style={{ ...S.th, flex: "1.2", textAlign: "right" }}>Amal</span>
          </div>

          {/* Rows */}
          {transactions.length === 0 ? (
            <div style={S.emptyRow}>Tranzaksiyalar topilmadi</div>
          ) : (
            transactions.map((t) => (
              <TransactionRow
                key={t._id}
                t={t}
                revoking={revoking}
                onRevokeClick={() => setConfirmModal(t)}
              />
            ))
          )}
        </div>
      </div>

      {/* ── Confirm modal ── */}
      {confirmModal && (
        <ConfirmModal
          t={confirmModal}
          revoking={revoking}
          onConfirm={() => handleRevoke(confirmModal)}
          onCancel={() => setConfirmModal(null)}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <div
          style={{
            ...S.toast,
            backgroundColor:
              toast.type === "success" ? "#059669" : "#E11D48",
          }}
        >
          {toast.message}
        </div>
      )}
    </main>
  );
};

/* ── TransactionRow ────────────────────────────────────── */

function TransactionRow({ t, revoking, onRevokeClick }) {
  const isRevoked = t.status === "revoked";
  const canRevoke = !isRevoked && isWithin24h(t.createdAt);
  const isBeingRevoked = revoking === t._id;
  const isGain = t.pointChange > 0;

  return (
    <div style={{ ...S.row, opacity: isRevoked ? 0.55 : 1 }}>
      {/* Student */}
      <div style={{ ...S.cell, flex: "2" }}>
        <div style={S.avatar}>
          {initials(t.studentId?.fullName)}
        </div>
        <div>
          <p style={S.cellPrimary}>{t.studentId?.fullName || "—"}</p>
          <p style={S.cellSecondary}>O'quvchi</p>
        </div>
      </div>

      {/* Rule + time */}
      <div style={{ ...S.cell, flex: "2", flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
        <p style={S.cellPrimary}>{t.ruleId?.title || "—"}</p>
        <span style={S.timeTag}>
          <Clock size={11} />
          {formatDate(t.createdAt)}
        </span>
      </div>

      {/* Reason */}
      <div style={{ ...S.cell, flex: "2.5" }}>
        <p style={S.reasonText}>{t.reason || "Izoh mavjud emas"}</p>
      </div>

      {/* Points */}
      <div style={{ ...S.cell, flex: "0.8", justifyContent: "center" }}>
        <span
          style={{
            ...S.pointBadge,
            backgroundColor: isGain ? "#ECFDF5" : "#FFF1F2",
            color: isGain ? "#059669" : "#E11D48",
          }}
        >
          {isGain ? `+${t.pointChange}` : t.pointChange}
        </span>
      </div>

      {/* Action */}
      <div style={{ ...S.cell, flex: "1.2", justifyContent: "flex-end" }}>
        {isRevoked ? (
          <span style={S.revokedTag}>
            <CheckCircle2 size={14} />
            Bekor qilindi
          </span>
        ) : canRevoke ? (
          <button
            style={{
              ...S.revokeBtn,
              opacity: isBeingRevoked ? 0.6 : 1,
              cursor: isBeingRevoked ? "not-allowed" : "pointer",
            }}
            onClick={onRevokeClick}
            disabled={isBeingRevoked}
          >
            <Undo2 size={14} />
            {isBeingRevoked ? "..." : "Bekor qilish"}
          </button>
        ) : (
          <span style={S.finalizedTag}>
            <CheckCircle2 size={14} />
            Yakunlandi
          </span>
        )}
      </div>
    </div>
  );
}

/* ── StatCard ──────────────────────────────────────────── */

function StatCard({ icon, label, value, unit, accent, bg }) {
  return (
    <div style={S.statCard}>
      <div style={{ ...S.statIcon, backgroundColor: bg, color: accent }}>
        {icon}
      </div>
      <div>
        <p style={S.statLabel}>{label}</p>
        <p style={S.statValue}>
          {value}
          <span style={S.statUnit}> {unit}</span>
        </p>
      </div>
    </div>
  );
}

/* ── ConfirmModal ──────────────────────────────────────── */

function ConfirmModal({ t, revoking, onConfirm, onCancel }) {
  return (
    <div style={S.overlay} onClick={onCancel}>
      <div style={S.modal} onClick={(e) => e.stopPropagation()}>
        <button style={S.modalClose} onClick={onCancel}>
          <X size={18} />
        </button>

        <div style={S.modalIconWrap}>
          <AlertTriangle size={24} color="#D97706" />
        </div>

        <h3 style={S.modalTitle}>Bekor qilishni tasdiqlang</h3>
        <p style={S.modalSub}>
          Bu tranzaksiya bekor qilinsa, o'quvchining bali tiklanganligi e'tiborga olinadi.
        </p>

        <div style={S.modalDetail}>
          <Row label="O'quvchi" value={t.studentId?.fullName || "—"} />
          <Row label="Sabab" value={t.ruleId?.title || "—"} />
          <Row
            label="Ball"
            value={
              <span
                style={{
                  fontWeight: 700,
                  color: t.pointChange > 0 ? "#059669" : "#E11D48",
                }}
              >
                {t.pointChange > 0 ? `+${t.pointChange}` : t.pointChange}
              </span>
            }
          />
          <Row label="Sana" value={formatDate(t.createdAt)} />
        </div>

        <div style={S.modalActions}>
          <button style={S.cancelBtn} onClick={onCancel}>
            Bekor
          </button>
          <button
            style={{
              ...S.confirmBtn,
              opacity: revoking ? 0.6 : 1,
              cursor: revoking ? "not-allowed" : "pointer",
            }}
            onClick={onConfirm}
            disabled={!!revoking}
          >
            <Undo2 size={15} />
            {revoking ? "Bekor qilinmoqda..." : "Ha, bekor qilish"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={S.detailRow}>
      <span style={S.detailLabel}>{label}</span>
      <span style={S.detailValue}>{value}</span>
    </div>
  );
}

/* ── Styles ────────────────────────────────────────────── */

const S = {
  loadingScreen: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
  },
  spinner: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "3px solid #E0E7FF",
    borderTopColor: "#4F46E5",
    animation: "spin 0.8s linear infinite",
  },
  page: {
    minHeight: "100vh",
    backgroundColor: "#F9FAFB",
    padding: "40px 48px",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    color: "#111827",
  },
  container: { maxWidth: 1100, margin: "0 auto" },

  /* Header */
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#9CA3AF",
    margin: "0 0 4px",
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: 800,
    letterSpacing: "-0.025em",
    margin: 0,
    color: "#0F172A",
  },
  teacherPill: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    padding: "10px 18px 10px 10px",
  },
  teacherAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  teacherRole: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#9CA3AF",
    margin: 0,
  },
  teacherName: {
    fontSize: 14,
    fontWeight: 700,
    color: "#111827",
    margin: 0,
  },

  /* Stats */
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 14,
    marginBottom: 28,
  },
  statCard: {
    backgroundColor: "#fff",
    border: "1px solid #F3F4F6",
    borderRadius: 16,
    padding: "16px 18px",
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  statIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: "#9CA3AF",
    margin: "0 0 2px",
  },
  statValue: {
    fontSize: 22,
    fontWeight: 800,
    color: "#0F172A",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  statUnit: {
    fontSize: 11,
    fontWeight: 500,
    color: "#D1D5DB",
  },

  /* Toolbar */
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#0F172A",
    margin: "0 0 2px",
    letterSpacing: "-0.01em",
  },
  sectionSub: { fontSize: 13, color: "#9CA3AF", margin: 0, fontWeight: 500 },
  exportBtn: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    padding: "9px 18px",
    backgroundColor: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    fontSize: 13,
    fontWeight: 700,
    color: "#4F46E5",
    cursor: "pointer",
  },

  /* Table card */
  tableCard: {
    backgroundColor: "#fff",
    border: "1px solid #F3F4F6",
    borderRadius: 20,
    overflow: "hidden",
  },
  tableHead: {
    display: "flex",
    padding: "12px 24px",
    backgroundColor: "#FAFAFA",
    borderBottom: "1px solid #F3F4F6",
  },
  th: {
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#9CA3AF",
  },
  row: {
    display: "flex",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #F9FAFB",
    transition: "background 0.12s",
  },
  cell: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    color: "#4F46E5",
    fontWeight: 800,
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cellPrimary: {
    fontSize: 14,
    fontWeight: 700,
    color: "#111827",
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  cellSecondary: {
    fontSize: 11,
    color: "#9CA3AF",
    margin: 0,
    fontWeight: 500,
  },
  timeTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 11,
    fontWeight: 600,
    color: "#9CA3AF",
  },
  reasonText: {
    fontSize: 13,
    color: "#6B7280",
    fontStyle: "italic",
    margin: 0,
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  pointBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "5px 12px",
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: "-0.01em",
  },
  revokeBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    backgroundColor: "#fff",
    border: "1px solid #FDE68A",
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 700,
    color: "#D97706",
    cursor: "pointer",
    transition: "background 0.12s",
  },
  revokedTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    fontSize: 12,
    fontWeight: 700,
    color: "#6B7280",
  },
  finalizedTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    fontSize: 12,
    fontWeight: 700,
    color: "#D1D5DB",
  },
  emptyRow: {
    padding: "40px 24px",
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: 500,
  },

  /* Modal */
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(15,23,42,0.45)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
    padding: 16,
  },
  modal: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: "32px 28px 24px",
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 24px 60px rgba(0,0,0,0.14)",
  },
  modalClose: {
    position: "absolute",
    top: 16,
    right: 16,
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 10,
    width: 34,
    height: 34,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#6B7280",
  },
  modalIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#FFFBEB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: "#0F172A",
    margin: "0 0 6px",
    letterSpacing: "-0.02em",
  },
  modalSub: {
    fontSize: 13,
    color: "#6B7280",
    margin: "0 0 20px",
    lineHeight: 1.6,
    fontWeight: 500,
  },
  modalDetail: {
    backgroundColor: "#F9FAFB",
    border: "1px solid #F3F4F6",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 20,
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 16px",
    borderBottom: "1px solid #F3F4F6",
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    color: "#9CA3AF",
  },
  detailValue: {
    fontSize: 13,
    fontWeight: 600,
    color: "#111827",
    maxWidth: "60%",
    textAlign: "right",
  },
  modalActions: {
    display: "flex",
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    padding: "13px 0",
    backgroundColor: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    fontSize: 14,
    fontWeight: 700,
    color: "#6B7280",
    cursor: "pointer",
  },
  confirmBtn: {
    flex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "13px 0",
    backgroundColor: "#D97706",
    border: "none",
    borderRadius: 14,
    fontSize: 14,
    fontWeight: 700,
    color: "#fff",
    cursor: "pointer",
  },

  /* Toast */
  toast: {
    position: "fixed",
    bottom: 28,
    right: 28,
    padding: "12px 20px",
    borderRadius: 14,
    fontSize: 14,
    fontWeight: 700,
    color: "#fff",
    zIndex: 100,
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  },
};

export default History;