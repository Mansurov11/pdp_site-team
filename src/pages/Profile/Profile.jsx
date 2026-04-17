import React, { useState } from "react";

const Profile = () => {
  // 1. State for the switches
  const [settings, setSettings] = useState({
    email: true,
    complaint: true,
    weekly: false,
    updates: true,
  });

  // 2. Toggle handler
  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="px-5 font-sans text-[#334155] mb-10">
      <h4 className="text-3xl font-bold mb-1">Profil</h4>
      <p className="text-slate-500 mb-8">
        O'qituvchi hisobi — shaxsiy ma'lumotlar va sozlamalar
      </p>

      {/* --- Profile Header Card --- */}
      <div className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm max-w-8xl">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-start">
            <div className="flex gap-6">
              <div className="relative">
                <div className="w-28 h-28 bg-[#EEF2FF] rounded-[20px] flex items-center justify-center">
                  <span className="text-[#6366F1] text-3xl font-bold">DR</span>
                </div>
                <button className="absolute bottom-1 -right-2 bg-[#4F46E5] p-2 rounded-full text-white shadow-lg border-2 border-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold text-slate-900">Dilnoza Rahimova</h3>
                <h5 className="text-[#6366F1] font-semibold">Matematika o'qituvchisi</h5>
                <p className="text-slate-400 text-sm mb-2">dilnoza@pdp.uz</p>
                <div className="flex gap-2">
                  <span className="bg-[#EEF2FF] text-[#6366F1] px-3 py-1 rounded-full text-xs font-bold">10-A</span>
                  <span className="bg-[#EEF2FF] text-[#6366F1] px-3 py-1 rounded-full text-xs font-bold">10-B</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#EEF2FF] flex items-center justify-center border-4 border-white shadow-sm">
                <span className="text-[#4F46E5] text-2xl font-bold">45</span>
              </div>
              <p className="text-xs text-slate-500 mt-2 font-medium uppercase tracking-wider">Jami harakatlar</p>
            </div>
          </div>

          <div className="h-[1px] bg-gray-100 w-full"></div>

          <div className="grid grid-cols-3 text-center divide-x divide-gray-100">
            <div className="flex flex-col gap-1">
              <h3 className="text-[#6366F1] text-3xl font-bold">2</h3>
              <p className="text-slate-500 text-sm">Tayinlangan sinflar</p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-slate-900 text-3xl font-bold">45</h3>
              <p className="text-slate-500 text-sm">Jami harakatlar</p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-[#059669] text-3xl font-semibold">Faol</h3>
              <p className="text-slate-500 text-sm">Holat</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-7">
        {/* Card 1: Personal Info */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between mb-8">
            <h3 className="text-[17px] font-bold flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#6366F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg> 
              Shaxsiy ma'lumotlar
            </h3>
            <button className="text-sm text-[#6366F1] font-medium">Tahrirlash</button>
          </div>
          <div className="space-y-6">
            <InfoRow label="To'liq ism" value="Dilnoza Rahimova" />
            <InfoRow label="Elektron pochta" value="dilnoza@pdp.uz" />
            <InfoRow label="Telefon raqami" value="+998 90 123 45 67" />
            <InfoRow label="Fan" value="Matematika" />
          </div>
        </div>

        {/* Card 2: Notifications (With Usable Switches) */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <h3 className="text-[17px] font-bold flex items-center gap-2 mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#6366F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Bildirishnomalar
          </h3>
          <div className="space-y-6">
            <ToggleRow 
              title="Email xabarnomalar" 
              desc="O'quvchi ball o'zgarganda" 
              active={settings.email} 
              onToggle={() => handleToggle('email')}
            />
            <ToggleRow 
              title="Shikoyat xabarnomasi" 
              desc="Yangi shikoyat kelib tushganda" 
              active={settings.complaint} 
              onToggle={() => handleToggle('complaint')}
            />
            <ToggleRow 
              title="Haftalik hisobot" 
              desc="Sinflar bo'yicha haftalik xulosalar" 
              active={settings.weekly} 
              onToggle={() => handleToggle('weekly')}
            />
            <ToggleRow 
              title="Tizim yangilanishlari" 
              desc="Platforma yangiliklari haqida" 
              active={settings.updates} 
              onToggle={() => handleToggle('updates')}
            />
          </div>
        </div>

        {/* Card 3: Security */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <h3 className="text-[17px] font-bold flex items-center gap-2 mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#6366F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Xavfsizlik
          </h3>
          <div className="space-y-5">
            <PasswordInput label="Joriy parol" />
            <PasswordInput label="Yangi parol" />
            <PasswordInput label="Yangi parolni tasdiqlang" />
            <button className="bg-[#4F46E5] text-white px-6 py-3 rounded-xl text-sm font-bold mt-4 hover:bg-[#4338ca] shadow-md transition-all">
              Parolni saqlash
            </button>
          </div>
        </div>

        {/* Card 4: Classes */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <h3 className="text-[17px] font-bold flex items-center gap-2 mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#6366F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Tayinlangan sinflar
          </h3>
          <div className="space-y-4">
            <ClassRow code="10-A" name="10-A sinfi" subject="Matematika" />
            <ClassRow code="10-B" name="10-B sinfi" subject="Matematika" />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Reusable Components ---

const InfoRow = ({ label, value }) => (
  <div className="flex items-center gap-4">
    <div className="w-10 h-10 bg-[#F8FAFC] rounded-xl flex items-center justify-center border border-slate-50">
      <div className="w-2 h-2 bg-[#6366F1] rounded-full"></div>
    </div>
    <div className="flex-1 border-b border-slate-50 pb-3">
      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{label}</p>
      <p className="text-[15px] text-slate-700 font-bold mt-0.5">{value}</p>
    </div>
  </div>
);

const ToggleRow = ({ title, desc, active, onToggle }) => (
  <div className="flex justify-between items-center group cursor-pointer" onClick={onToggle}>
    <div>
      <p className="text-[15px] font-bold text-slate-700">{title}</p>
      <p className="text-[12px] text-slate-400 font-medium">{desc}</p>
    </div>
    {/* Switch Container */}
    <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${active ? 'bg-[#4F46E5]' : 'bg-slate-200'}`}>
      {/* Switch Knob */}
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${active ? 'right-1' : 'left-1'}`} />
    </div>
  </div>
);

const PasswordInput = ({ label }) => (
  <div>
    <label className="text-[11px] text-slate-400 font-bold uppercase tracking-wide mb-2 block">{label}</label>
    <div className="relative">
      <input 
        type="password" 
        defaultValue="password123" 
        className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium" 
      />
      <div className="absolute right-4 top-3.5 text-slate-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </div>
    </div>
  </div>
);

const ClassRow = ({ code, name, subject }) => (
  <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:bg-[#F8FAFC] transition-all cursor-pointer group shadow-sm">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-[#EEF2FF] rounded-xl flex items-center justify-center text-[#6366F1] font-extrabold text-sm border border-indigo-50">
        {code}
      </div>
      <div>
        <p className="text-[15px] font-bold text-slate-700">{name}</p>
        <p className="text-[11px] text-slate-400 uppercase font-bold tracking-tighter">{subject}</p>
      </div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-all group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </div>
);

export default Profile;