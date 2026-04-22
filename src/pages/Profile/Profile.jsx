import React, { useState } from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [settings, setSettings] = useState({
    email: true,
    complaint: true,
    weekly: false,
    updates: true,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="px-5 font-sans text-[#334155] mb-10">
      <h4 className="text-3xl font-bold mb-1">Profil</h4>
      <p className="text-slate-500 mb-8">O'qituvchi hisobi — shaxsiy ma'lumotlar va sozlamalar</p>

      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm max-w-8xl">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-start">
            <div className="flex gap-6 items-center">
              <div className="relative">
                <div className="w-28 h-28 bg-[#EEF2FF] rounded-[20px] flex items-center justify-center">
                  <span className="text-[#6366F1] text-4xl font-bold uppercase">
                    {(user?.fullName || user?.name || "U")[0]}
                  </span>
                </div>
                <button className="absolute bottom-1 -right-2 bg-[#4F46E5] p-2 rounded-full text-white shadow-lg border-2 border-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                  {user?.fullName || user?.name || "Foydalanuvchi"}
                </h3>
                <h5 className="text-[#6366F1] font-semibold">{user?.role || "O'qituvchi"}</h5>
                <p className="text-slate-400 text-sm mb-2">{user?.email || "email@pdp.uz"}</p>
                <div className="flex gap-2">
                  <span className="bg-[#EEF2FF] text-[#6366F1] px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase">10-A Sinifi</span>
                  <span className="bg-[#EEF2FF] text-[#6366F1] px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase">10-B Sinifi</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#EEF2FF] flex items-center justify-center border-4 border-white shadow-sm">
                <span className="text-[#4F46E5] text-2xl font-bold">45</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">Harakatlar</p>
            </div>
          </div>

          <div className="h-px bg-gray-100 w-full"></div>

          <div className="grid grid-cols-3 text-center divide-x divide-gray-100">
            <div>
              <h3 className="text-[#6366F1] text-3xl font-bold">2</h3>
              <p className="text-slate-500 text-sm">Sinflar</p>
            </div>
            <div>
              <h3 className="text-slate-900 text-3xl font-bold">45</h3>
              <p className="text-slate-500 text-sm">Ballar</p>
            </div>
            <div>
              <h3 className="text-[#059669] text-3xl font-semibold">Faol</h3>
              <p className="text-slate-500 text-sm">Holat</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-7">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <h3 className="text-[17px] font-bold mb-8">Shaxsiy ma'lumotlar</h3>
          <div className="space-y-6">
            <InfoRow label="Ism" value={user?.fullName || user?.name || "Kiritilmagan"} />
            <InfoRow label="Email" value={user?.email || "Mavjud emas"} />
            <InfoRow label="Telefon" value={user?.phone || "+998 90 000 00 00"} />
            <InfoRow label="Lavozim" value={user?.role || "Matematika O'qituvchisi"} />
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <h3 className="text-[17px] font-bold mb-8">Bildirishnomalar</h3>
          <div className="space-y-6">
            <ToggleRow 
              title="Email xabarnomalar" 
              desc="Yangi ballar haqida xabar berish" 
              active={settings.email} 
              onToggle={() => handleToggle('email')} 
            />
            <ToggleRow 
              title="Haftalik hisobot" 
              desc="Dushanba kungi xulosalar" 
              active={settings.weekly} 
              onToggle={() => handleToggle('weekly')} 
            />
            <ToggleRow 
              title="Tizim yangilanishlari" 
              desc="Yangi funksiyalar haqida" 
              active={settings.updates} 
              onToggle={() => handleToggle('updates')} 
            />
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <h3 className="text-[17px] font-bold mb-8">Xavfsizlik</h3>
          <div className="space-y-5">
            <PasswordInput label="Joriy parol" />
            <PasswordInput label="Yangi parol" />
            <button className="bg-[#4F46E5] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:bg-[#4338ca] active:scale-95 transition-all">
              Parolni saqlash
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <h3 className="text-[17px] font-bold mb-8">Tayinlangan sinflar</h3>
          <div className="space-y-4">
            <ClassRow code="10-A" name="10-A sinfi" subject="Matematika" />
            <ClassRow code="10-B" name="10-B sinfi" subject="Matematika" />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex items-center gap-4">
    <div className="w-1.5 h-1.5 bg-[#6366F1] rounded-full"></div>
    <div className="flex-1">
      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{label}</p>
      <p className="text-[15px] text-slate-700 font-bold">{value}</p>
    </div>
  </div>
);

const ToggleRow = ({ title, desc, active, onToggle }) => (
  <div className="flex justify-between items-center group cursor-pointer" onClick={onToggle}>
    <div>
      <p className="text-[15px] font-bold text-slate-700">{title}</p>
      <p className="text-[12px] text-slate-400">{desc}</p>
    </div>
    <div className={`w-11 h-6 rounded-full relative transition-all duration-300 ${active ? 'bg-[#4F46E5]' : 'bg-slate-200'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${active ? 'right-1' : 'left-1'}`} />
    </div>
  </div>
);

const PasswordInput = ({ label }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="text-[11px] text-slate-400 font-bold uppercase mb-2 block">{label}</label>
      <div className="relative">
        <input 
          type={show ? "text" : "password"} 
          defaultValue={localStorage.getItem("password")} 
          className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all" 
        />
        <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-3.5 text-slate-300 hover:text-indigo-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={show ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
          </svg>
        </button>
      </div>
    </div>
  );
};

const ClassRow = ({ code, name, subject }) => (
  <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:bg-[#F8FAFC] transition-all cursor-pointer group shadow-sm">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-[#EEF2FF] rounded-xl flex items-center justify-center text-[#6366F1] font-extrabold text-sm border border-indigo-50 uppercase">
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