"use client";
import { supabase } from "@/lib/supabaseClient";
import { TextAlignJustify } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardHeader({ toggleSidebar }) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
  return (
    <header className="w-full h-16 bg-sidebar-primary border-b border-sidebar-accent flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <TextAlignJustify
          className="size-7 text-maintext cursor-pointer"
          onClick={toggleSidebar}
        />
        <h1 className="text-xl font-bold text-maintext">لوحة التحكم</h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="bg-input text-maintext px-4 py-2 rounded cursor-pointer hover:bg-accent transition duration-300"
        >
          تسجيل خروج
        </button>
        <button className="relative p-2 rounded-full hover:bg-accent transition duration-300 cursor-pointer">
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          🔔
        </button>

        <Link href="/dashboard/settings">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/profile.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-sm font-bold text-maintext mt-4">
              المستخدم
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
