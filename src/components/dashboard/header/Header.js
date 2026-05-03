"use client";
import { TextAlignJustify } from "lucide-react";
import UserMenu from "./UserMenu";

export default function DashboardHeader({ toggleSidebar }) {
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
          aria-label="الاشعارات"
          className="relative p-2 rounded-full hover:bg-accent transition duration-300 cursor-pointer"
        >
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          🔔
        </button>

        <UserMenu />
      </div>
    </header>
  );
}
