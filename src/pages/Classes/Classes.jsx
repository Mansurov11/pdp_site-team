import React from "react";

const Classes = () => {
  const myClasses = [
    { id: 1, name: "10-A", sub: "10-sinf", students: 5, avg: 8.5, yellow: 1, red: 0 },
    { id: 2, name: "10-B", sub: "10-sinf", students: 2, avg: 7.8, yellow: 2, red: 1 },
    { id: 3, name: "11-A", sub: "11-sinf", students: 1, avg: 9.1, yellow: 0, red: 0 },
  ];

  return (
    <div className="p-8 bg-[#F8FAFF] min-h-screen">
      <h1 className="text-3xl font-bold text-slate-900 mb-1">Sinflar</h1>
      <p className="text-slate-500 mb-8">Sizga biriktirilgan sinflar</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {myClasses.map((cls) => (
          <div key={cls.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            {/* Top Row */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-800">{cls.name}</h2>
                <p className="text-xs text-slate-400 font-semibold">{cls.sub}</p>
              </div>
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">O'quvchilar soni</span>
                <span className="font-bold text-slate-800">{cls.students}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">O'rtacha ball</span>
                <span className="font-bold text-slate-800">{cls.avg}</span>
              </div>
            </div>

            <div className="h-px bg-gray-100 mb-4" />

            {/* Warnings Section */}
            <div className="flex gap-4">
              {cls.yellow > 0 && (
                <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z" />
                  </svg>
                  {cls.yellow} sariq
                </div>
              )}
              {cls.red > 0 && (
                <div className="flex items-center gap-1 text-red-500 text-xs font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                  {cls.red} qizilbek
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;