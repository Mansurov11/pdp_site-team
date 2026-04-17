import React from "react";

const Profile = () => {
  return (
    <div className="px-5 font-sans text-[#334155]">

      <h4 className="text-3xl font-bold mb-1">Profil</h4>
      <p className="text-slate-500 mb-8">
        O'qituvchi hisobi — shaxsiy ma'lumotlar va sozlamalar
      </p>


      <div className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm max-w-8xl">
        <div className="flex flex-col gap-8">
          

          <div className="flex justify-between items-start">
            <div className="flex gap-6">


              <div className="relative">
                <div className="w-28 h-28 bg-[#EEF2FF] rounded-[20px] flex items-center justify-center">
                  <span className="text-[#6366F1] text-3xl font-bold">DR</span>
                </div>
                <button className="absolute bottom-1 -right-2 bg-[#4F46E5] p-2 rounded-full text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 rounded-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
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
              <div className="w-20 h-20 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                <span className="text-[#4F46E5] text-2xl font-bold">45</span>
              </div>
              <p className="text-xs text-slate-500 mt-2 font-medium">Jami harakatlar</p>
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
      <div className="flex gap-6 max-w-8xl mt-7">
         <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm w-4xl">
          <div className="flex justify-between">
            <h3 className="main_title text-xl font-semibold">Shaxsiy ma'lumotlar</h3>
              <button className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-medium">Tahrirlash</button>
          </div>
       </div>
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm w-4xl">

       </div>
      </div>
      
    </div>
  );
};

export default Profile;