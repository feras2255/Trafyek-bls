"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div ref={menuRef} className="relative">
      {/* زر القائمة */}
      <div
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Image
          src="/profile.png"
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-sm font-bold text-maintext mt-2">المستخدم</span>
      </div>

      {/* القائمة المنسدلة */}
      {open && (
        <div
          className="absolute left-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden animate-fade-in"
          style={{ zIndex: 50 }}
        >
          <Link
            href="/"
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            onClick={() => setOpen(false)}
          >
            🏠 زيارة الموقع
          </Link>
          <Link
            href="/dashboard/settings"
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            onClick={() => setOpen(false)}
          >
            ⚙️ الإعدادات
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-start px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
          >
            🚪 تسجيل الخروج
          </button>
        </div>
      )}
    </div>
  );
}
