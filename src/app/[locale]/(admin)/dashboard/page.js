"use client";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Link } from "@/i18n/navigation";
import { toast } from "sonner";
import {
  RiSettings4Line,
  RiUserLine,
  RiShieldLine,
  RiArrowLeftSLine,
} from "react-icons/ri";
import StatsCards from "@/components/dashboard/StatsCards";

const EMPTY_STATS = {
  products: 0,
  categories: 0,
  projects: 0,
  blogs: 0,
  partners: 0,
  messages: 0,
};

export default function Dashboard() {
  const [stats, setStats] = useState(EMPTY_STATS);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoading(true);

    // نحاول أولاً عبر دالة RPC (استعلام واحد)، ونعود للعدّ المباشر عند فشلها
    const { data, error } = await supabase.rpc("get_dashboard_stats");

    if (!error && data) {
      setStats({ ...EMPTY_STATS, ...data });
      setLoading(false);
      return;
    }

    const tables = Object.keys(EMPTY_STATS);
    const results = await Promise.all(
      tables.map((table) =>
        supabase
          .from(table === "messages" ? "contact_messages" : table)
          .select("id", { count: "exact", head: true }),
      ),
    );

    const fallback = { ...EMPTY_STATS };
    let failed = false;

    results.forEach((res, i) => {
      if (res.error) failed = true;
      else fallback[tables[i]] = res.count || 0;
    });

    if (failed) toast.error("تعذّر جلب بعض الإحصائيات");
    setStats(fallback);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

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
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 font-sans" dir="rtl">
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
        <section>
          <StatsCards stats={stats} loading={loading} />
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-6 px-2">
            إدارة الصفحات القانونية
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.title}
                className="group"
              >
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
