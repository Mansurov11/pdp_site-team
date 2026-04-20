import React from "react";
import { useNavigate } from "react-router-dom";
import Pdp from "../../assets/pdp.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFF] font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src={Pdp} alt="Logo" className="w-10 h-10" />
          <div>
            <h1 className="text-xl font-bold text-[#1E293B] leading-none">PDP School</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">O'quvchi Etikasi Indeksi</p>
          </div>
        </div>
        <div className="flex items-center gap-6 ">
          <button onClick={() => navigate("/login")} className="w-full sm:w-auto bg-[#4F46E5] text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
            Kirish
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
         
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
       <div className="inline-flex items-center gap-2 bg-[#EEF2FF] border border-indigo-100 px-4 py-1.5 rounded-full mb-8">
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={2} 
    stroke="currentColor" 
    className="w-4 h-4 text-indigo-600"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.385a.563.563 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345l2.125-5.111Z" />
  </svg>
  <span className="text-indigo-600 text-xs font-bold uppercase tracking-wide">
    PDP School o'quvchi etikasi platformasi
  </span>
</div>
        <h2 className="text-5xl md:text-7xl font-black text-[#1E293B] mb-6 leading-[1.1]">
          Tartib va intizomni <br />
          <span className="text-[#8B5CF6]">zamonaviy boshqaring</span>
        </h2>

        <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
          O'quvchilar uchun ball tizimi, o'qituvchilar uchun oddiy boshqaruv, ma'murlar uchun 
          to'liq nazorat. Hammasi bir platformada.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
        
          <button onClick={() => navigate("/login")} className="w-full sm:w-auto bg-[#4F46E5] text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
            Kirish
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon="users" count="1,200+" label="Faol o'quvchilar" color="blue" />
          <StatCard icon="grad" count="50+" label="O'qituvchilar" color="indigo" />
          <StatCard icon="classes" count="30+" label="Sinflar" color="purple" />
          <StatCard icon="points" count="45,000+" label="Umumiy ball" color="blue" />
        </div>
      </main>
    </div>
  );
};

// Sub-component for the stats cards
const StatCard = ({ icon, count, label }) => {
  const icons = {
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />,
    grad: <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A5.906 5.906 0 0 1 12 4.48a5.907 5.907 0 0 1 10.391 4.854 50.62 50.62 0 0 0-2.658.813M4.26 10.147L12 13.653l7.74-3.506m-15.48 0a50.635 50.635 0 0 1 1.635-7.143m13.845 7.143a50.634 50.634 0 0 0-1.635-7.143M12 13.653v7.251" />,
    classes: <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />,
    points: <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.385a.563.563 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345l2.125-5.111Z" />
  };

  return (
    <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#6366F1]">
          {icons[icon]}
        </svg>
      </div>
      <h3 className="text-3xl font-black text-[#1E293B] mb-1">{count}</h3>
      <p className="text-gray-400 text-sm font-medium uppercase tracking-tighter">{label}</p>
    </div>
  );
};

export default LandingPage;