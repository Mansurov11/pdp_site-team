import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Pdp from "../../assets/pdp.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    login(email, password);
  };

  async function login(email, password) {
    try {
      setLoading(true);
      const res = await axios.post(
        `https://pdp-system-backend-1.onrender.com/api/v1/auth/login`,
        { email, password }
      );

      // FIXED: Accessing the nested data object from your API response
      const { accessToken, user } = res.data.data;

      if (user.role === "teacher" || user.role === "admin") {
        toast.success("Muvaffaqiyatli kirildi!");
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else {
        toast.warning("Siz admin emassiz!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  const isDesktop = window.innerWidth >= 1024;

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100%", overflow: "hidden" }}>

      {/* ── Left Panel — EXACT ORIGINAL STYLES ── */}
      {isDesktop && (
        <div
          style={{
            width: "45%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "40px",
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, #5b52f0 0%, #4338ca 40%, #3730a3 100%)",
            flexShrink: 0,
          }}
        >
          {/* Diagonal shimmer restored */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: `linear-gradient(-132.5deg, #6366f1 50%, transparent 50%)`,
              zIndex: 1
            }}
          />

          {/* Logo + Quote column restored */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px", zIndex: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: "white",
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  flexShrink: 0,
                }}
              >
                <img src={Pdp} alt="" />
              </div>
              <div>
                <div style={{ color: "white", fontWeight: 700, fontSize: 20, lineHeight: 1.2 }}>
                  PDP School
                </div>
                <div style={{ color: "#a5b4fc", fontSize: 13 }}>O'quvchi Etikasi Indeksi</div>
              </div>
            </div>

            <div>
              <p style={{ color: "white", fontSize: 22, fontWeight: 600, lineHeight: 1.4, marginBottom: 8 }}>
                "Tartib va intizom - muvaffaqiyatning kaliti"
              </p>
              <p style={{ color: "#a5b4fc", fontSize: 13 }}>- PDP School</p>
            </div>
          </div>

          <p style={{ color: "#a5b4fc", fontSize: 12, zIndex: 10 }}>
            © 2026 PDP School. Barcha huquqlar himoyalangan.
          </p>
        </div>
      )}

      {/* ── Right Panel — EXACT ORIGINAL STYLES ── */}
      <div
        style={{
          flex: 1,
          minHeight: "100vh",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
          width: isDesktop ? "auto" : "100%",
        }}
      >
        <div style={{ width: "100%", maxWidth: 440 }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
            Xush kelibsiz
          </h2>
          <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 32 }}>
            Davom etish uchun hisobingizga kiring
          </p>

        

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#374151", marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                placeholder="email@pdp.uz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  fontSize: 14,
                  color: "#1f2937",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#374151", marginBottom: 6 }}>
                Parol
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  fontSize: 14,
                  color: "#1f2937",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <span style={{ color: "#4f46e5", fontSize: 14, cursor: "pointer" }}>
                Parolni unutdingizmi? Ustozingizga Ayting!
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(90deg, #4f46e5, #4338ca)",
                color: "white",
                fontWeight: 600,
                fontSize: 16,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                marginBottom: 20,
              }}
            >
              {loading ? "Kirilmoqda..." : "Kirish"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: 14, color: "#6b7280" }}>
            Hisobingiz yo'qmi?{" "}
            <span style={{ color: "#4f46e5", cursor: "pointer", fontWeight: 500 }}>
             Ustozingizga Ayting!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;