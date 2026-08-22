"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useState } from "react";
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
import { cn } from "@/lib/utils";

export default function DashboardSidebar({ isOpen, isRtl = true }) {
  const t = useTranslations("dashboard.sidebar");
  const pathname = usePathname();

  const pageLinks = [
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
  ];

  // نفتح قائمة الصفحات تلقائياً إذا كنا داخل إحداها
  const [openPages, setOpenPages] = useState(() =>
    pageLinks.some((link) => pathname?.startsWith(link.href)),
  );

  const iconSize = 22;

  const menu = [
    {
      label: t("home"),
      href: "/dashboard",
      icon: <HiOutlineHome size={iconSize} />,
      exact: true,
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
      href: "/dashboard/blogs",
      icon: <HiOutlineDocumentText size={iconSize} />,
    },
    {
      label: t("pages"),
      icon: <HiOutlineDocumentText size={iconSize} />,
      isDropdown: true,
      subMenu: pageLinks,
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

  const isActive = (href, exact) =>
    exact ? pathname === href : pathname?.startsWith(href);

  return (
    <aside
      className={cn(
        "fixed top-0 h-full bg-gray-900 text-white transition-all duration-300 z-50",
        isRtl ? "right-0 border-l" : "left-0 border-r",
        "border-gray-800",
        isOpen ? "w-64" : "w-20",
      )}
    >
      <div className="h-16 flex items-center justify-center font-black text-xl border-b border-gray-800 tracking-tight">
        {isOpen ? "TRAFYEK BLS" : "TB"}
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto h-[calc(100vh-64px)]">
        {menu.map((item) =>
          item.isDropdown ? (
            <div key={item.label} className="space-y-1">
              <button
                type="button"
                onClick={() => setOpenPages((prev) => !prev)}
                aria-label={item.label}
                aria-expanded={openPages}
                className="flex w-full items-center justify-between px-3 py-3 rounded-xl hover:bg-gray-800 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
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
                <div
                  className={cn(
                    "mt-1 space-y-1 transition duration-300 border-gray-800",
                    isRtl ? "pr-4 border-r mr-6" : "pl-4 border-l ml-6",
                  )}
                >
                  {item.subMenu.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      aria-label={sub.label}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-all",
                        isActive(sub.href)
                          ? "bg-gray-800 text-white"
                          : "text-gray-400 hover:text-white hover:bg-gray-800",
                      )}
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
              aria-label={item.label}
              title={!isOpen ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl group transition-all",
                isActive(item.href, item.exact)
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-800",
              )}
            >
              <span
                className={cn(
                  "transition-colors",
                  isActive(item.href, item.exact)
                    ? "text-primary"
                    : "text-gray-400 group-hover:text-primary",
                )}
              >
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
