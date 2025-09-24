"use client";
import DashboardHeader from "@/components/dashboard/Header";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-100">
        <div className="flex">
          <DashboardSidebar isOpen={isSidebarOpen} />

          <div
            className="flex-1 flex flex-col transition-all duration-300"
            style={{ marginRight: isSidebarOpen ? "16rem" : "4rem" }}
          >
            <DashboardHeader
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
