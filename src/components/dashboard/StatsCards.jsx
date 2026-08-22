"use client";
import { Link } from "@/i18n/navigation";
import {
  RiDatabase2Line,
  RiLayoutGridLine,
  RiArchiveDrawerLine,
  RiArticleLine,
  RiTeamLine,
  RiMailLine,
} from "react-icons/ri";

const CARDS = [
  {
    key: "products",
    label: "المنتجات",
    href: "/dashboard/products",
    icon: <RiArchiveDrawerLine />,
    color: "from-blue-600 to-blue-400",
    shadow: "shadow-blue-200",
  },
  {
    key: "categories",
    label: "الأقسام",
    href: "/dashboard/categories",
    icon: <RiLayoutGridLine />,
    color: "from-purple-600 to-purple-400",
    shadow: "shadow-purple-200",
  },
  {
    key: "projects",
    label: "المشاريع",
    href: "/dashboard/projects",
    icon: <RiDatabase2Line />,
    color: "from-emerald-600 to-emerald-400",
    shadow: "shadow-emerald-200",
  },
  {
    key: "blogs",
    label: "المقالات",
    href: "/dashboard/blogs",
    icon: <RiArticleLine />,
    color: "from-amber-600 to-amber-400",
    shadow: "shadow-amber-200",
  },
  {
    key: "partners",
    label: "الشركاء",
    href: "/dashboard/partners",
    icon: <RiTeamLine />,
    color: "from-rose-600 to-rose-400",
    shadow: "shadow-rose-200",
  },
  {
    key: "messages",
    label: "الرسائل",
    href: "/dashboard/messages",
    icon: <RiMailLine />,
    color: "from-slate-700 to-slate-500",
    shadow: "shadow-slate-200",
  },
];

export default function StatsCards({ stats = {}, loading = false }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      dir="rtl"
    >
      {CARDS.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          aria-label={item.label}
          className="group relative bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
        >
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
                {loading ? (
                  <span className="inline-block h-9 w-16 bg-slate-100 rounded animate-pulse" />
                ) : (
                  <span className="text-4xl font-black text-slate-900 tracking-tight">
                    {stats[item.key] ?? 0}
                  </span>
                )}
                <div className="mb-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          </div>

          <div
            className={`absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r ${item.color} group-hover:w-full transition-all duration-700`}
          />
        </Link>
      ))}
    </div>
  );
}
