"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function DashboardRouteLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-sidebar-primary z-40 rounded-md">
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
    </div>
  );
}
