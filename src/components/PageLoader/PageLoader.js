"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSiteSettings } from "@/app/context/SiteSettingsContext";

export default function PageLoader() {
  const settings = useSiteSettings();

  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading || !settings) return null;
  return (
    <div className="fixed inset-0 bg-card flex items-center justify-center z-50">
      <Image
        src={settings.settings.image_url}
        alt="شعار المتجر"
        width={220}
        height={220}
        className="animate-pulse"
        priority
      />
    </div>
  );
}
