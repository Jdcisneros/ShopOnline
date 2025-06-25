"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Menu,
  LayoutDashboard,
  ShoppingBag,
  Users,
  Tag,
  Star,
  Percent,
  Home,
  Store,
} from "lucide-react";

const navItems = [
  { label: "Inicio", href: "/admin", icon: Home },
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Productos", href: "/admin/products", icon: ShoppingBag },
  { label: "Ordenes", href: "/admin/orders", icon: ShoppingBag },
  { label: "Usuarios", href: "/admin/users", icon: Users },
  { label: "Categorías", href: "/admin/categories", icon: Tag },
  { label: "Destacados", href: "/admin/products/featured", icon: Star },
  { label: "En Oferta", href: "/admin/products/sale", icon: Percent },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Desktop */}
      <div
        className={cn(
          "hidden lg:flex flex-col h-screen bg-white shadow-sm transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <span className="text-xl font-bold text-indigo-600">Admin</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-600 hover:text-indigo-600"
          >
            <Menu size={20} />
          </button>
        </div>

        <div className="flex flex-col justify-between flex-1 px-2 pb-4">
          <nav className="flex flex-col gap-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all",
                  pathname === href
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                )}
              >
                <Icon size={20} />
                {!collapsed && <span>{label}</span>}
              </Link>
            ))}
          </nav>

          {/* Volver a la tienda */}
          <Link
            href="/"
            className="mt-4 flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:text-black transition"
          >
            <Store size={20} />
            {!collapsed && <span>Volver a la tienda</span>}
          </Link>
        </div>
      </div>

      {/* Sidebar Mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 bottom-0 z-50 w-64 bg-white p-6 shadow-md flex flex-col justify-between"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-bold text-indigo-600">Admin</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  ✕
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {navItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all",
                      pathname === href
                        ? "bg-indigo-100 text-indigo-700 font-semibold"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    )}
                  >
                    <Icon size={20} />
                    <span>{label}</span>
                  </Link>
                ))}
              </nav>

              {/* Volver a la tienda (mobile) */}
              <Link
                href="/"
                className="mt-4 flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:text-black transition"
              >
                <Store size={20} />
                <span>Volver a la tienda</span>
              </Link>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-auto">
        <header className="h-16 flex items-center justify-between bg-white px-4 shadow-sm lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-700 hover:text-indigo-600"
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
          <span className="text-sm text-gray-500 hidden lg:inline-block">
            Panel de administración
          </span>
        </header>

        <main className="flex-1 p-6 max-w-full box-border overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
