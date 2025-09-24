import Link from "next/link";
import { Home, Users, Settings, Package, Mail } from "lucide-react";

export default function DashboardSidebar({ isOpen }) {
  const menu = [
    { label: "الرئيسية", href: "/dashboard", icon: <Home size={20} /> },
    {
      label: "المنتجات",
      href: "/dashboard/products",
      icon: <Package size={20} />,
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
      <div className="h-16 flex items-center justify-center font-bold text-lg border-b border-sidebar-accent">
        {isOpen ? "Trafyek Bls" : "TB"}
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-0  py-2 rounded hover:bg-sidebar-accent transition"
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
