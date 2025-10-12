"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Home,
  Settings,
  Package,
  Mail,
  Layers,
  Folder,
  FileText,
  ChevronDown,
  ChevronUp,
  Info,
  ShieldCheck,
  Clipboard,
} from "lucide-react";

export default function DashboardSidebar({ isOpen }) {
  const [openPages, setOpenPages] = useState(false);

  const menu = [
    { label: "الرئيسية", href: "/dashboard", icon: <Home size={20} /> },
    {
      label: "التصنيفات",
      href: "/dashboard/categories",
      icon: <Layers size={20} />,
    },
    {
      label: "المنتجات",
      href: "/dashboard/products",
      icon: <Package size={20} />,
    },
    {
      label: "المشاريع",
      href: "/dashboard/projects",
      icon: <Folder size={20} />,
    },
    {
      label: "الصفحات",
      icon: <FileText size={20} />,
      isDropdown: true,
      subMenu: [
        {
          label: "من نحن",
          href: "/dashboard/pages/about-us",
          icon: <Info size={20} />,
        },
        {
          label: "سياسة الخصوصية",
          href: "/dashboard/pages/privacy-policy",
          icon: <ShieldCheck size={20} />,
        },
        {
          label: "الشروط والاحكام",
          href: "/dashboard/pages/terms-conditions",
          icon: <Clipboard size={20} />,
        },
      ],
    },
    {
      label: "المراسلات",
      href: "/dashboard/messages",
      icon: <Mail size={20} />,
    },
    {
      label: "الإعدادات",
      href: "/dashboard/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside
      className={`fixed right-0 top-0 h-full bg-gray-800 text-white border-l border-gray-700 transition-all duration-300 
      ${isOpen ? "w-64" : "w-16"}`}
    >
      <div className="h-16 flex items-center justify-center font-bold text-lg border-b border-gray-700">
        {isOpen ? "Trafyek Bls" : "TB"}
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) =>
          item.isDropdown ? (
            <div key={item.label}>
              <button
                onClick={() => setOpenPages((prev) => !prev)}
                className="flex w-full items-center justify-between px-2 py-2 rounded hover:bg-gray-700 transition"
              >
                <div className="flex items-center gap-3 cursor-pointer">
                  {item.icon}
                  {isOpen && <span className="text-xl">{item.label}</span>}
                </div>
                {isOpen &&
                  (openPages ? (
                    <ChevronUp size={16} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400" />
                  ))}
              </button>

              {openPages && isOpen && (
                <div className="pl-9 mt-1 space-y-1 transition duration-300">
                  {item.subMenu.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="flex items-center gap-3 px-3 py-1 text-base text-gray-300 hover:text-white"
                    >
                      {sub.icon}
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-700 transition"
            >
              {item.icon}
              {isOpen && <span className="text-xl">{item.label}</span>}
            </Link>
          )
        )}
      </nav>
    </aside>
  );
}
