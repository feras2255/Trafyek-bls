"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="relative">
        <div className="loader-ring text-secondary"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/lo.png"
            alt="Loader Logo"
            width={48}
            height={48}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
