"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  UserIcon,
  PackageIcon,
  HeartIcon,
  LogOutIcon,
  UserCog,
} from "lucide-react";
import { useState } from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (!session) return null;

  const navItems = [
    {
      href: "/profile",
      label: "Perfil",
      icon: <UserIcon className="w-5 h-5" />,
    },
    {
      href: "/profile/orders",
      label: "Mis pedidos",
      icon: <PackageIcon className="w-5 h-5" />,
    },
    {
      href: "/profile/favorites",
      label: "Favoritos",
      icon: <HeartIcon className="w-5 h-5" />,
    },
    {
      href: "/profile/edit",
      label: "Editar datos",
      icon: <UserCog className="w-5 h-5" />,
    },
    {
      href: "#",
      label: "Salir",
      icon: <LogOutIcon className="w-5 h-5" />,
      action: () => setShowLogoutModal(true),
    },
  ];

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10 mt-20">
        {/* Sidebar */}
        <aside className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm h-fit">
          <div className="mb-8 flex items-center gap-4">
            <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center text-lg font-bold text-neutral-800">
              {session.user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-800">
                {session.user.name}
              </p>
              <p className="text-xs text-neutral-500">{session.user.email}</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) =>
              item.action ? (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all text-neutral-700 hover:bg-neutral-100`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    pathname === item.href
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </aside>

        {/* Contenido principal */}
        <main className="md:col-span-3 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          {children}
        </main>
      </div>

      {/* Modal de Confirmación de Cierre de Sesión */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md space-y-4 text-center">
            <h2 className="text-lg font-semibold text-neutral-800">
              ¿Deseás cerrar sesión?
            </h2>
            <p className="text-sm text-neutral-500">
              Tu sesión actual se cerrará y volverás a la página de inicio de
              sesión.
            </p>
            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm rounded-lg border border-neutral-300 hover:bg-neutral-100"
              >
                Cancelar
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-4 py-2 text-sm rounded-lg bg-neutral-900 text-white hover:bg-neutral-800"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
