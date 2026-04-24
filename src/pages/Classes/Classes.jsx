import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { Plus, Search, Users, BookOpen, X, ShieldCheck, ChevronRight, GraduationCap } from "lucide-react";

const Classes = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedClassName, setSelectedClassName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "password123",
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://pdp-system-backend-1.onrender.com/api/v1/classes",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const fetchedData = res.data?.data || res.data || [];
      setClasses(Array.isArray(fetchedData) ? fetchedData : []);
    } catch (err) {
      console.log(err.message);
      toast.error("Sinflarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminCreateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const newUserPayload = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      password: formData.password,
      role: "student",
      classId: selectedClassId,
    };
    try {
      await axios.post(
        "https://pdp-system-backend-1.onrender.com/api/v1/users",
        newUserPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Yangi o'quvchi muvaffaqiyatli yaratildi!");
      setIsModalOpen(false);
      setFormData({ name: "", surname: "", email: "", password: "password123" });
      fetchClasses();
    } catch (err) {
      console.error("Yaratishda xatolik:", err.response?.data);
      toast.error(
        err.response?.data?.message ||
          "Foydalanuvchi yaratishda xatolik (404/400)"
      );
    }
  };

  const filteredClasses = classes.filter((c) =>
    (c.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (classId, className) => {
    setSelectedClassId(classId);
    setSelectedClassName(className);
    setIsModalOpen(true);
  };

  if (loading) return <Loader />;

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <p style={styles.headerEyebrow}>Boshqaruv paneli</p>
          <h1 style={styles.headerTitle}>Sinflar</h1>
        </div>
        <div style={styles.adminBadge}>
          <ShieldCheck size={15} />
          <span>Admin</span>
        </div>
      </div>

      {/* Stats row */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <span style={styles.statValue}>{classes.length}</span>
          <span style={styles.statLabel}>Jami sinflar</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statValue}>
            {classes.reduce((acc, c) => acc + (c.students?.length || 0), 0)}
          </span>
          <span style={styles.statLabel}>Jami o'quvchilar</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statValue}>
            {filteredClasses.length}
          </span>
          <span style={styles.statLabel}>Qidiruv natijalari</span>
        </div>
      </div>

      {/* Search */}
      <div style={styles.searchWrapper}>
        <Search size={16} style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Sinf nomini qidiring..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button style={styles.clearBtn} onClick={() => setSearchTerm("")}>
            <X size={14} />
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredClasses.length === 0 ? (
        <div style={styles.emptyState}>
          <GraduationCap size={40} style={{ opacity: 0.25, marginBottom: 12 }} />
          <p style={styles.emptyTitle}>Sinf topilmadi</p>
          <p style={styles.emptySubtitle}>Qidiruv so'zini o'zgartiring</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredClasses.map((item, i) => (
            <ClassCard
              key={item._id}
              item={item}
              index={i}
              onNavigate={() => navigate(`/home/classes/${item._id}`)}
              onAddStudent={() => openModal(item._id, item.name)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div style={styles.overlay} onClick={() => setIsModalOpen(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={styles.modalHeader}>
              <div>
                <p style={styles.modalEyebrow}>Yangi o'quvchi</p>
                <h2 style={styles.modalTitle}>{selectedClassName}</h2>
              </div>
              <button
                style={styles.closeBtn}
                onClick={() => setIsModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div style={styles.modalDivider} />

            <form onSubmit={handleAdminCreateUser}>
              <div style={styles.fieldGrid}>
                <FormField
                  placeholder="Ism"
                  value={formData.name}
                  onChange={(v) => setFormData({ ...formData, name: v })}
                  required
                />
                <FormField
                  placeholder="Familiya"
                  value={formData.surname}
                  onChange={(v) => setFormData({ ...formData, surname: v })}
                  required
                />
              </div>
              <FormField
                placeholder="Email manzil"
                type="email"
                value={formData.email}
                onChange={(v) => setFormData({ ...formData, email: v })}
                required
                full
              />
              <FormField
                placeholder="Parol"
                type="text"
                value={formData.password}
                onChange={(v) => setFormData({ ...formData, password: v })}
                required
                full
              />

              <div style={styles.classIdBox}>
                <span style={styles.classIdLabel}>Sinf ID</span>
                <span style={styles.classIdValue}>{selectedClassId}</span>
              </div>

              <button type="submit" style={styles.submitBtn}>
                Tizimga qo'shish
                <ChevronRight size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Sub-components ───────────────────────────────────── */

const CLASS_COLORS = [
  { bg: "#EEF2FF", icon: "#4F46E5", text: "#3730A3" },
  { bg: "#F0FDF4", icon: "#16A34A", text: "#15803D" },
  { bg: "#FFF7ED", icon: "#EA580C", text: "#C2410C" },
  { bg: "#FDF2F8", icon: "#A855F7", text: "#7E22CE" },
  { bg: "#ECFEFF", icon: "#0891B2", text: "#0E7490" },
];

const ClassCard = ({ item, index, onNavigate, onAddStudent }) => {
  const color = CLASS_COLORS[index % CLASS_COLORS.length];
  const count = item.students?.length || 0;

  return (
    <div style={styles.card}>
      {/* Top: icon + name */}
      <div style={styles.cardTop} onClick={onNavigate}>
        <div style={{ ...styles.cardIcon, backgroundColor: color.bg }}>
          <BookOpen size={18} color={color.icon} />
        </div>
        <div style={styles.cardMeta}>
          <h3 style={{ ...styles.cardName, color: color.text }}>{item.name}</h3>
          <div style={styles.cardCount}>
            <Users size={13} style={{ opacity: 0.4 }} />
            <span>{count} o'quvchi</span>
          </div>
        </div>
        <ChevronRight size={16} style={styles.cardChevron} />
      </div>

      {/* Bottom: progress bar + add button */}
      <div style={styles.cardBottom}>
        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressFill,
              width: `${Math.min((count / 30) * 100, 100)}%`,
              backgroundColor: color.icon,
            }}
          />
        </div>
        <button
          style={{ ...styles.addBtn, color: color.icon, borderColor: color.bg }}
          onClick={onAddStudent}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = color.bg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <Plus size={14} />
          O'quvchi qo'shish
        </button>
      </div>
    </div>
  );
};

const FormField = ({ placeholder, value, onChange, type = "text", required, full }) => (
  <input
    required={required}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{ ...styles.input, ...(full ? { width: "100%", boxSizing: "border-box" } : {}) }}
  />
);

/* ── Styles ───────────────────────────────────────────── */

const styles = {
  page: {
    padding: "40px 48px",
    minHeight: "100vh",
    backgroundColor: "#F9FAFB",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
  },
  headerEyebrow: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#9CA3AF",
    margin: "0 0 4px",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: "#111827",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  adminBadge: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    fontWeight: 600,
    color: "#4F46E5",
    backgroundColor: "#EEF2FF",
    padding: "6px 14px",
    borderRadius: 999,
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    marginBottom: 28,
  },
  statCard: {
    backgroundColor: "#fff",
    border: "1px solid #F3F4F6",
    borderRadius: 16,
    padding: "16px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  statValue: {
    fontSize: 26,
    fontWeight: 700,
    color: "#111827",
    letterSpacing: "-0.02em",
  },
  statLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: 500,
  },
  searchWrapper: {
    position: "relative",
    marginBottom: 28,
  },
  searchIcon: {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9CA3AF",
    pointerEvents: "none",
  },
  searchInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px 44px",
    backgroundColor: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    fontSize: 14,
    fontWeight: 500,
    color: "#111827",
    outline: "none",
    transition: "border-color 0.15s",
  },
  clearBtn: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#9CA3AF",
    display: "flex",
    alignItems: "center",
    padding: 4,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 16,
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 0",
    color: "#6B7280",
  },
  emptyTitle: { fontSize: 16, fontWeight: 600, margin: "0 0 4px" },
  emptySubtitle: { fontSize: 14, color: "#9CA3AF", margin: 0 },

  /* Card */
  card: {
    backgroundColor: "#fff",
    border: "1px solid #F3F4F6",
    borderRadius: 20,
    overflow: "hidden",
    transition: "box-shadow 0.2s",
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "20px 20px 14px",
    cursor: "pointer",
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardMeta: { flex: 1, minWidth: 0 },
  cardName: {
    fontSize: 15,
    fontWeight: 700,
    margin: "0 0 3px",
    letterSpacing: "-0.01em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  cardCount: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: 500,
  },
  cardChevron: { color: "#D1D5DB", flexShrink: 0 },
  cardBottom: {
    padding: "0 20px 18px",
    borderTop: "1px solid #F9FAFB",
    paddingTop: 14,
  },
  progressTrack: {
    height: 4,
    backgroundColor: "#F3F4F6",
    borderRadius: 99,
    marginBottom: 14,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 99,
    transition: "width 0.4s ease",
  },
  addBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "10px 0",
    fontSize: 13,
    fontWeight: 600,
    border: "1.5px solid",
    borderRadius: 12,
    cursor: "pointer",
    backgroundColor: "transparent",
    transition: "background-color 0.15s",
  },

  /* Modal */
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
    padding: 16,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: "28px 28px 24px",
    width: "100%",
    maxWidth: 440,
    boxShadow: "0 24px 48px rgba(0,0,0,0.12)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  modalEyebrow: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#9CA3AF",
    margin: "0 0 4px",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#111827",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  closeBtn: {
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 10,
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#6B7280",
    flexShrink: 0,
  },
  modalDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 20,
  },
  fieldGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 10,
  },
  input: {
    padding: "12px 14px",
    backgroundColor: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 500,
    color: "#111827",
    outline: "none",
    marginBottom: 10,
    display: "block",
  },
  classIdBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: "10px 14px",
    marginBottom: 18,
    marginTop: 4,
  },
  classIdLabel: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#9CA3AF",
  },
  classIdValue: {
    fontSize: 11,
    fontFamily: "monospace",
    color: "#4F46E5",
    fontWeight: 600,
    maxWidth: 200,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  submitBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "14px 0",
    backgroundColor: "#4F46E5",
    color: "#fff",
    border: "none",
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: "-0.01em",
  },
};

export default Classes;