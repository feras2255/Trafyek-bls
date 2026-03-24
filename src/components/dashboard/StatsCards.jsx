"use client";
import {
  RiDatabase2Line,
  RiLayoutGridLine,
  RiArchiveDrawerLine,
} from "react-icons/ri";

export default function StatsCards({ stats }) {
  const data = [
    {
      label: "المنتجات",
      value: stats.products,
      icon: <RiArchiveDrawerLine />,
      color: "from-blue-600 to-blue-400",
      shadow: "shadow-blue-200",
      bgLight: "bg-blue-50/50",
    },
    {
      label: "الأقسام",
      value: stats.categories,
      icon: <RiLayoutGridLine />,
      color: "from-purple-600 to-purple-400",
      shadow: "shadow-purple-200",
      bgLight: "bg-purple-50/50",
    },
    {
      label: "المشاريع",
      value: stats.projects,
      icon: <RiDatabase2Line />,
      color: "from-emerald-600 to-emerald-400",
      shadow: "shadow-emerald-200",
      bgLight: "bg-emerald-50/50",
    },
  ];

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 rtl"
      dir="rtl"
    >
      {data.map((item, index) => (
        <div
          key={index}
          className="group relative bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
        >
          {/* دائرة ضوئية خلفية خافتة جداً */}
          <div
            className={`absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-gradient-to-br ${item.color} opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500`}
          />

          <div className="relative flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-2xl shadow-lg ${item.shadow} group-hover:scale-110 transition-transform duration-500`}
              >
                {item.icon}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[2px] bg-slate-50 px-3 py-1 rounded-full">
                Live Data
              </span>
            </div>

            <div>
              <h4 className="text-slate-500 font-bold text-sm mb-1">
                {item.label}
              </h4>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-slate-900 tracking-tight">
                  {item.value || 0}
                </span>
                <div className="mb-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* خط جمالي سفلي ناعم */}
          <div
            className={`absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r ${item.color} group-hover:w-full transition-all duration-700`}
          />
        </div>
      ))}
    </div>
  );
}
