"use client";
import DashboardHeader from "@/components/dashboard/Header";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  return (
    <div className="flex">
      <DashboardSidebar isOpen={isSidebarOpen} />

      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginRight: isSidebarOpen ? "16rem" : "4rem" }}
      >
        <DashboardHeader
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="p-6">
          {children}
          <Toaster />
        </main>
      </div>
    </div>
  );
}
