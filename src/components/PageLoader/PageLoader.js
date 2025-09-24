"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function PageLoader({ logo }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // تشغيل اللودر عند تغيير المسار
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800); // وقت افتراضي
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-card flex items-center justify-center z-50">
      <Image
        src={logo}
        alt="شعار المتجر"
        width={220}
        height={100}
        className="animate-pulse"
        priority
      />
    </div>
  );
}
