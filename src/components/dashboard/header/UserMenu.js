"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/navigation";
import { supabase } from "@/lib/supabaseClient";
import LanguageSwitcher from "@/components/header/LanguageSwitcher";

export default function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user?.email) setEmail(data.user.email);
    });
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="قائمة المستخدم"
        className="flex items-center gap-2 cursor-pointer select-none"
      >
        <Image
          src="/profile.png"
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-sm font-bold text-maintext hidden sm:inline max-w-[10rem] truncate">
          {email || "المستخدم"}
        </span>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-52 bg-background-2 border border-border rounded-lg shadow-lg overflow-hidden z-50">
          <Link
            href="/"
            aria-label="زيارة الموقع"
            className="block px-4 py-2 text-sm text-maintext hover:bg-accent hover:text-text transition"
            onClick={() => setOpen(false)}
          >
            🏠 زيارة الموقع
          </Link>
          <Link
            href="/dashboard/settings"
            aria-label="الإعدادات"
            className="block px-4 py-2 text-sm text-maintext hover:bg-accent hover:text-text transition"
            onClick={() => setOpen(false)}
          >
            ⚙️ الإعدادات
          </Link>
          <LanguageSwitcher isDashboard />
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            aria-label="تسجيل الخروج"
            className="block w-full text-start px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition cursor-pointer disabled:opacity-50"
          >
            🚪 {loggingOut ? "جاري الخروج..." : "تسجيل الخروج"}
          </button>
        </div>
      )}
    </div>
  );
}
