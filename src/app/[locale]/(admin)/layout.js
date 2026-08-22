"use client";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Toaster } from "@/components/ui/sonner";
import DashboardLoader from "@/components/dashboard/DashboardLoader";
import DashboardHeader from "@/components/dashboard/header/Header";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ur";

  useEffect(() => {
    let active = true;

    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;

      if (!data.session) router.replace("/login");
      else setChecking(false);
    };

    checkUser();

    // تسجيل الخروج من تبويب آخر يجب أن يخرجنا من اللوحة أيضاً
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/login");
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  // لا نعرض محتوى اللوحة قبل التأكد من الجلسة
  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  const sidebarWidth = isSidebarOpen ? "16rem" : "5rem";

  return (
    <div className="flex" dir={isRtl ? "rtl" : "ltr"}>
      <DashboardSidebar isOpen={isSidebarOpen} isRtl={isRtl} />

      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={
          isRtl ? { marginRight: sidebarWidth } : { marginLeft: sidebarWidth }
        }
      >
        <DashboardHeader
          toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
        <main className="p-6 relative min-h-screen">
          <DashboardLoader />

          {children}
          <Toaster />
        </main>
      </div>
    </div>
  );
}
