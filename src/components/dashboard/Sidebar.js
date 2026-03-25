"use client";

import Link from "next/link";
import { useState } from "react";
// استيراد الأيقونات من React Icons
import {
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineShoppingBag,
  HiOutlineFolderOpen,
  HiOutlineDocumentText,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineInformationCircle,
  HiOutlineShieldCheck,
  HiOutlineClipboardDocumentList,
  HiOutlineUsers,
  HiOutlineEnvelope,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import { useTranslations } from "next-intl";

export default function DashboardSidebar({ isOpen }) {
  const t = useTranslations("dashboard.sidebar");
  const [openPages, setOpenPages] = useState(false);

  // حجم الأيقونات الموحد
  const iconSize = 22;

  const menu = [
    {
      label: t("home"),
      href: "/dashboard",
      icon: <HiOutlineHome size={iconSize} />,
    },
    {
      label: t("categories"),
      href: "/dashboard/categories",
      icon: <HiOutlineSquares2X2 size={iconSize} />,
    },
    {
      label: t("products"),
      href: "/dashboard/products",
      icon: <HiOutlineShoppingBag size={iconSize} />,
    },
    {
      label: t("projects"),
      href: "/dashboard/projects",
      icon: <HiOutlineFolderOpen size={iconSize} />,
    },
    {
      label: t("blog"),
      href: "/dashboard/blog",
      icon: <HiOutlineDocumentText size={iconSize} />,
    },
    {
      label: t("pages"),
      icon: <HiOutlineDocumentText size={iconSize} />,
      isDropdown: true,
      subMenu: [
        {
          label: t("about"),
          href: "/dashboard/pages/about-us",
          icon: <HiOutlineInformationCircle size={18} />,
        },
        {
          label: t("privacy"),
          href: "/dashboard/pages/privacy-policy",
          icon: <HiOutlineShieldCheck size={18} />,
        },
        {
          label: t("terms"),
          href: "/dashboard/pages/terms-conditions",
          icon: <HiOutlineClipboardDocumentList size={18} />,
        },
      ],
    },
    {
      label: t("partners"),
      href: "/dashboard/partners",
      icon: <HiOutlineUsers size={iconSize} />,
    },
    {
      label: t("messages"),
      href: "/dashboard/messages",
      icon: <HiOutlineEnvelope size={iconSize} />,
    },
    {
      label: t("settings"),
      href: "/dashboard/settings",
      icon: <HiOutlineCog6Tooth size={iconSize} />,
    },
  ];

  return (
    <aside
      className={`fixed right-0 top-0 h-full bg-gray-900 text-white border-l border-gray-800 transition-all duration-300 z-50
      ${isOpen ? "w-64" : "w-20"}`}
    >
      <div className="h-16 flex items-center justify-center font-black text-xl border-b border-gray-800 tracking-tight">
        {isOpen ? "TRAFYEK BLS" : "TB"}
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto h-[calc(100vh-64px)]">
        {menu.map((item) =>
          item.isDropdown ? (
            <div key={item.label} className="space-y-1">
              <button
                onClick={() => setOpenPages((prev) => !prev)}
                className="flex w-full items-center justify-between px-3 py-3 rounded-xl hover:bg-gray-800 transition-all group"
              >
                <div className="flex items-center gap-3 cursor-pointer">
                  <span className="text-gray-400 group-hover:text-primary transition-colors">
                    {item.icon}
                  </span>
                  {isOpen && (
                    <span className="text-md font-medium">{item.label}</span>
                  )}
                </div>
                {isOpen &&
                  (openPages ? (
                    <HiOutlineChevronUp size={16} className="text-gray-500" />
                  ) : (
                    <HiOutlineChevronDown size={16} className="text-gray-500" />
                  ))}
              </button>

              {openPages && isOpen && (
                <div className="pr-4 mt-1 space-y-1 transition duration-300 border-r border-gray-800 mr-6">
                  {item.subMenu.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
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
              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-800 group transition-all"
            >
              <span className="text-gray-400 group-hover:text-primary transition-colors">
                {item.icon}
              </span>
              {isOpen && (
                <span className="text-md font-medium">{item.label}</span>
              )}
            </Link>
          ),
        )}
      </nav>
    </aside>
  );
}
