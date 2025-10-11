"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import StatsCards from "@/components/ui/StatsCards";
import VisitorsChart from "@/components/dashboard/VisitorsChart";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    projects: 0,
  });

  const [sessions, setSessions] = useState(null);

  useEffect(() => {
    async function fetchAnalytics() {
      const res = await fetch("/api/analytics");
      const data = await res.json();
      if (data.success) {
        setSessions(data.data.rows?.[0]?.metricValues?.[0]?.value || 0);
      }
    }
    fetchAnalytics();
  }, []);

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

      {/* latest 5 products */}
      <div className="p-6">
        <VisitorsChart />
      </div>
    </div>
  );
}
