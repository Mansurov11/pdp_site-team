import React, { useState, useEffect } from "react";
import { Calendar, TrendingUp, Users, Award, Clock, Zap } from "lucide-react";
import axios from "axios";
import Loader from "../../components/Loader";

const API_BASE = "https://pdp-system-backend-1.onrender.com/api/v1";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [hoveredBar, setHoveredBar] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const teacherId = user?._id || user?.id;

        if (!teacherId || !token) {
          setLoading(false);
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(
          `${API_BASE}/stats/teacher/${teacherId}`,
          { headers }
        );

        const s = res.data?.data || res.data || {};

        setStats([
          { title: "Bugun",        value: s.todayPoints        || 0, icon: <Zap size={17} />,        accent: "#4F46E5", bg: "#EEF2FF" },
          { title: "Shu oy",       value: s.monthlyPoints      || 0, icon: <TrendingUp size={17} />,  accent: "#059669", bg: "#ECFDF5" },
          { title: "Sinflar",      value: s.activeClassesCount  || 0, icon: <Users size={17} />,      accent: "#0284C7", bg: "#E0F2FE" },
          { title: "Jami amallar", value: s.totalTransactions   || 0, icon: <Award size={17} />,      accent: "#7C3AED", bg: "#F5F3FF" },
        ]);

        setChartData(Array.isArray(s.weeklyActivity)    ? s.weeklyActivity    : []);
        setActivities(Array.isArray(s.recentActivities) ? s.recentActivities  : []);
      } catch (err) {
        console.error("Xatolik:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <Loader />;

  const maxVal = Math.max(...chartData.map((d) => d.value || 0), 1);

  return (
    <div style={S.page}>

      {/* Header */}
      <div style={S.pageHeader}>
        <div>
          <p style={S.eyebrow}>O'qituvchi paneli</p>
          <h1 style={S.pageTitle}>Statistika</h1>
        </div>
        <div style={S.datePill}>
          <Calendar size={14} color="#9CA3AF" />
          <span style={S.datePillText}>
            {new Date().toLocaleDateString("uz-UZ", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Stat cards */}
      <div style={S.statsGrid}>
        {stats.map((item, i) => (
          <div key={i} style={S.statCard}>
            <div style={{ ...S.statIconWrap, backgroundColor: item.bg, color: item.accent }}>
              {item.icon}
            </div>
            <p style={S.statLabel}>{item.title}</p>
            <h2 style={{ ...S.statValue, color: item.accent }}>{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Weekly chart */}
      <div style={{ ...S.card, marginBottom: 20 }}>
        <div style={S.cardHeader}>
          <div>
            <p style={S.cardEyebrow}>Haftalik faoliyat</p>
            <h3 style={S.cardTitle}>Ball dinamikasi</h3>
          </div>
          <div style={S.chartLegend}>
            <span style={S.legendDot} />
            <span style={S.legendText}>Ball</span>
          </div>
        </div>

        {chartData.length === 0 ? (
          <div style={S.emptyState}>Ma'lumot mavjud emas</div>
        ) : (
          <div style={S.chartArea}>
            {[1, 0.75, 0.5, 0.25, 0].map((pct) => (
              <div key={pct} style={{ ...S.gridLine, bottom: `${pct * 100}%` }}>
                <span style={S.gridLabel}>{Math.round(maxVal * pct)}</span>
              </div>
            ))}

            <div style={S.barsRow}>
              {chartData.map((bar, i) => {
                const pct = (bar.value || 0) / maxVal;
                const isHovered = hoveredBar === i;
                return (
                  <div
                    key={i}
                    style={S.barCol}
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {isHovered && (
                      <div style={S.tooltip}>
                        <span style={S.tooltipVal}>{bar.value}</span>
                        <span style={S.tooltipUnit}>ball</span>
                      </div>
                    )}
                    <div style={S.barTrack}>
                      <div
                        style={{
                          ...S.barFill,
                          height: `${Math.max(pct * 100, 2)}%`,
                          backgroundColor: isHovered ? "#4338CA" : "#4F46E5",
                          opacity: hoveredBar !== null && !isHovered ? 0.35 : 1,
                        }}
                      />
                    </div>
                    <span style={S.barLabel}>{bar.day || bar.date}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Recent activities */}
      <div style={S.card}>
        <div style={S.cardHeader}>
          <div>
            <p style={S.cardEyebrow}>Faollik</p>
            <h3 style={S.cardTitle}>So'nggi amallar</h3>
          </div>
          <Clock size={15} color="#9CA3AF" />
        </div>

        {activities.length === 0 ? (
          <p style={S.emptyState}>Hali amallar bajarilmagan</p>
        ) : (
          <div style={S.activitiesGrid}>
            {activities.map((act, i) => {
              const isPos = act.points > 0;
              return (
                <div key={i} style={S.activityCard}>
                  <div
                    style={{
                      ...S.activityDot,
                      backgroundColor: isPos ? "#ECFDF5" : "#FFF1F2",
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: isPos ? "#059669" : "#E11D48",
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={S.activityName}>{act.studentName}</p>
                    <p style={S.activityReason}>{act.reason || "Ball berildi"}</p>
                    {act.createdAt && (
                      <p style={S.activityTime}>
                        <Clock size={10} style={{ display: "inline", marginRight: 3 }} />
                        {formatDate(act.createdAt)}
                      </p>
                    )}
                  </div>
                  <span
                    style={{
                      ...S.activityPoints,
                      color: isPos ? "#059669" : "#E11D48",
                      backgroundColor: isPos ? "#ECFDF5" : "#FFF1F2",
                    }}
                  >
                    {isPos ? "+" : ""}{act.points}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

const S = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F9FAFB",
    padding: "40px 48px",
    fontFamily: "system-ui, sans-serif",
    color: "#111827",
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
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
  datePill: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: "8px 16px",
  },
  datePillText: {
    fontSize: 13,
    fontWeight: 600,
    color: "#6B7280",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "#fff",
    border: "1px solid #F3F4F6",
    borderRadius: 20,
    padding: "20px 22px",
  },
  statIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#9CA3AF",
    margin: "0 0 4px",
  },
  statValue: {
    fontSize: 28,
    fontWeight: 800,
    letterSpacing: "-0.03em",
    margin: 0,
  },
  card: {
    backgroundColor: "#fff",
    border: "1px solid #F3F4F6",
    borderRadius: 24,
    padding: "24px 26px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  cardEyebrow: {
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#9CA3AF",
    margin: "0 0 3px",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#0F172A",
    margin: 0,
    letterSpacing: "-0.01em",
  },
  chartLegend: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: "#4F46E5",
    display: "inline-block",
  },
  legendText: {
    fontSize: 12,
    fontWeight: 600,
    color: "#9CA3AF",
  },
  chartArea: {
    position: "relative",
    height: 220,
    paddingLeft: 36,
  },
  gridLine: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTop: "1px dashed #F3F4F6",
  },
  gridLabel: {
    position: "absolute",
    left: 0,
    top: -10,
    fontSize: 10,
    fontWeight: 700,
    color: "#CBD5E1",
    width: 30,
    textAlign: "right",
  },
  barsRow: {
    display: "flex",
    alignItems: "flex-end",
    height: "100%",
    gap: 10,
    paddingBottom: 28,
  },
  barCol: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    position: "relative",
    cursor: "default",
  },
  barTrack: {
    flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
  },
  barFill: {
    width: "100%",
    borderRadius: "8px 8px 4px 4px",
    transition: "height 0.35s ease, opacity 0.2s ease, background-color 0.15s ease",
  },
  barLabel: {
    position: "absolute",
    bottom: 0,
    fontSize: 10,
    fontWeight: 700,
    color: "#CBD5E1",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    whiteSpace: "nowrap",
  },
  tooltip: {
    position: "absolute",
    top: -2,
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#0F172A",
    borderRadius: 8,
    padding: "4px 10px",
    display: "flex",
    alignItems: "baseline",
    gap: 3,
    whiteSpace: "nowrap",
    zIndex: 10,
    pointerEvents: "none",
  },
  tooltipVal: { fontSize: 13, fontWeight: 800, color: "#fff" },
  tooltipUnit: { fontSize: 10, fontWeight: 600, color: "#94A3B8" },
  emptyState: {
    height: 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#CBD5E1",
    fontSize: 13,
    fontStyle: "italic",
    margin: 0,
  },
  activitiesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
  },
  activityCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#FAFAFA",
    border: "1px solid #F3F4F6",
    borderRadius: 16,
    padding: "12px 14px",
  },
  activityDot: {
    width: 32,
    height: 32,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  activityName: {
    fontSize: 13,
    fontWeight: 700,
    color: "#111827",
    margin: "0 0 2px",
  },
  activityReason: {
    fontSize: 11,
    color: "#6B7280",
    margin: "0 0 3px",
    fontStyle: "italic",
  },
  activityTime: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: 600,
    margin: 0,
    display: "flex",
    alignItems: "center",
  },
  activityPoints: {
    fontSize: 14,
    fontWeight: 800,
    padding: "4px 10px",
    borderRadius: 9,
    flexShrink: 0,
    letterSpacing: "-0.01em",
  },
};

export default Statistics;