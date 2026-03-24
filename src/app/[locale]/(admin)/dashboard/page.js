"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import {
  RiSettings4Line,
  RiUserLine,
  RiShieldLine,
  RiArrowLeftSLine,
} from "react-icons/ri";
import StatsCards from "@/components/dashboard/StatsCards";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    projects: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data, error } = await supabase.rpc("get_dashboard_stats");
    if (!error && data) {
      setStats({
        products: data.products,
        categories: data.categories,
        projects: data.projects,
      });
    }
  };

  const menuItems = [
    {
      title: "من نحن",
      desc: "تعديل النص التعريفي للشركة",
      href: "/dashboard/pages/about-us",
      icon: <RiUserLine />,
    },
    {
      title: "سياسة الخصوصية",
      desc: "إدارة بنود حماية البيانات",
      href: "/dashboard/pages/privacy-policy",
      icon: <RiShieldLine />,
    },
    {
      title: "الشروط والاحكام",
      desc: "تحديث اتفاقية الاستخدام",
      href: "/dashboard/pages/terms-conditions",
      icon: <RiSettings4Line />,
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 font-sans rtl"
      dir="rtl"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg shadow-blue-200">
            👋
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              مرحباً بك في الإدارة
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              إليك نظرة سريعة على حالة المنصة اليوم
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-10">
        {/* Stats Section */}
        <section>
          <StatsCards stats={stats} />
        </section>

        {/* Links Section */}
        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-6 px-2">
            إدارة الصفحات القانونية
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {menuItems.map((item, idx) => (
              <Link key={idx} href={item.href} className="group">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-blue-200 hover:shadow-md transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-xl text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{item.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <RiArrowLeftSLine
                    className="text-slate-300 group-hover:text-blue-600 transform group-hover:-translate-x-2 transition-all"
                    size={24}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
