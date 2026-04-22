import React from "react";
import { Loader2 } from "lucide-react";

const Loader = ({ title = "YUKLANMOQDA", subtitle = "Tizim tekshirilmoqda" }) => (
  <div className="h-screen flex items-center justify-center bg-[#F8FAFC] p-6">
    <div className="">
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-3xl animate-ping opacity-20"></div>

          <Loader2 className="text-indigo-500 animate-spin" size={50} strokeWidth={3} />

      </div>



      </div>
    </div>

);

export default Loader;