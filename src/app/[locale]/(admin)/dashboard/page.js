"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import StatsCards from "@/components/ui/StatsCards";
import Link from "next/link";

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
    if (!error) {
      setStats({
        products: data.products,
        categories: data.categories,
        projects: data.projects,
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl text-primary font-bold">الرئيسية </h1>
      <p className="text-lg text-secondary px-4">مرحباً 👋</p>

      <StatsCards stats={stats} />

      <ul className="bg-card px-6 py-4 rounded-xl shadow-md ">
        <li className="text-lg text-accent font-bold underline">
          <Link href="/dashboard/pages/about-us">من نحن</Link>
        </li>
        <li className="text-lg text-accent font-bold underline">
          <Link href="/dashboard/pages/privacy-policy">سياسة الخصوصية</Link>
        </li>
        <li className="text-lg text-accent font-bold underline">
          <Link href="/dashboard/pages/terms-conditions">الشروط والاحكام </Link>
        </li>
      </ul>
    </div>
  );
}
