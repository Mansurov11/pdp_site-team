import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Pdp from "../../assets/pdp.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    
    // Basic validation to prevent unnecessary requests
    if (!email || !password) {
      return toast.error("Barcha maydonlarni to'ldiring!");
    }

    try {
      setLoading(true);
      
      // Changed from /api/docs to /api/login
      const res = await axios.post(
        `https://pdp-system-backend-1.onrender.com/api/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Check if user and token exist in response
      if (res.data && res.data.token) {
        if (res.data.user && res.data.user.role === "admin") {
          toast.success("Muvaffaqiyatli kirildi!");
          localStorage.setItem("token", res.data.token);
          navigate("/home");
        } else {
          toast.warning("Siz admin emassiz!");
        }
      } else {
        toast.error("Ma'lumot topilmadi!");
      }

    } catch (err) {
      // Detailed error messages to help you debug
      if (err.response) {
        // The server responded with a status other than 2xx
        toast.error(err.response.data.message || "Email yoki parol noto'g'ri!");
      }  else {
        toast.error("Noma'lum xatolik yuz berdi.");
      }
      console.error("Login Details:", err);
    } finally {
      setLoading(false);
    }
  };

  const isDesktop = window.innerWidth >= 1024;

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100%", overflow: "hidden" }}>

      {/* ── Left Panel ── */}
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
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: `linear-gradient(-132.5deg, #6366f1 50%, transparent 50%)`,
              zIndex: 1
            }}
          />

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
                <img src={Pdp} alt="PDP" style={{ width: "70%" }} />
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

      {/* ── Right Panel ── */}
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

          <div
            style={{
              background: "#eef2ff",
              border: "1px solid #e0e7ff",
              borderRadius: 12,
              padding: "16px",
              marginBottom: 32,
              fontSize: 13,
            }}
          >
            <p style={{ color: "#374151", fontWeight: 600, marginBottom: 8 }}>Demo hisob:</p>
            <p style={{ color: "#4f46e5" }}>Admin: admin@pdp.uz</p>
            <p style={{ color: "#4f46e5" }}>Parol: istalgan matn</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#374151", marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                required
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
                required
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
                Parolni unutdingizmi?
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
              Ro'yxatdan o'tish
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;