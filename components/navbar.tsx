"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useCartStore } from "@/store/cartStore";
import {
  ShoppingBag,
  Menu,
  X,
  User,
  ChevronRight,
} from "lucide-react";
import CartPreview from "./cartPreview";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Category = {
  id: string;
  name: string;
};

export default function MainNavbar() {
  const { data: session } = useSession();
  const cartItems = useCartStore((state) => state.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartPreviewOpen, setCartPreviewOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);

  const cartPreviewRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        cartPreviewRef.current &&
        !cartPreviewRef.current.contains(event.target as Node)
      ) {
        setCartPreviewOpen(false);
      }
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  }, [sidebarOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        setShowLogoutModal(false);
        setCartPreviewOpen(false);
      }
    }
    if (sidebarOpen || showLogoutModal || cartPreviewOpen) {
      document.addEventListener("keydown", onKeyDown);
    }
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [sidebarOpen, showLogoutModal, cartPreviewOpen]);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-screen z-50 bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Tienda Online
          </Link>

          <form
            action="/search"
            method="GET"
            className="hidden md:flex flex-1 max-w-lg mx-6"
          >
            <input
              type="text"
              name="q"
              placeholder="Buscar productos..."
              className="w-full px-4 py-2 rounded-xl border border-gray-300 text-sm bg-white text-gray-0 placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
          </form>

          <div className="flex items-center gap-4  ">
            <button
              onClick={() => setCartPreviewOpen((prev) => !prev)}
              className="relative hover:scale-110 transition-transform "
              aria-label="Abrir carrito"
              type="button"
            >
              <ShoppingBag className="w-6 h-6 text-black " />
              {totalQuantity > 0 && (
                <span className="absolute text-xs font-bold text-white bg-gray-800 rounded-full w-4 h-4 flex items-center justify-center -bottom-1 -right-1">
                  {totalQuantity}
                </span>
              )}
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-md text-gray-800 hover:scale-110 transition-transform">
                  <User className="w-6 h-6" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 mt-4 bg-white rounded-xl shadow-xl border text-base"
              >
                {session?.user ? (
                  <>
                    {session.user.isAdmin ? (
                      <DropdownMenuItem asChild>
                        <Link
                          href="/admin"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Panel de control
                        </Link>
                      </DropdownMenuItem>
                    ) : (
                      <>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/profile"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Perfil
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/profile/favorites"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Favoritos
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/profile/orders"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Pedidos
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem asChild>
                      <button
                        onClick={() => {
                          setShowLogoutModal(true);
                        }}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                        type="button"
                      >
                        Cerrar sesión
                      </button>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link
                      href="/login"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Iniciar sesión
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menú"
              type="button"
              className="p-2 rounded-md text-gray-800 hover:scale-110 transition-transform"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg px-6 pt-6 pb-10 flex flex-col gap-4 text-base transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        ref={sidebarRef}
        aria-modal="true"
        role="dialog"
      >
        <div className="flex justify-end">
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Cerrar menú"
            className="p-2 rounded-md hover:bg-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form action="/search" method="GET" className="mb-2">
          <input
            type="text"
            name="q"
            placeholder="Buscar productos..."
            className="w-full px-4 py-2 lg:hidden rounded-xl border border-gray-300 text-sm bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
        </form>

        <hr />

        <nav className="flex flex-col gap-1 text-[15px]">
          <Link
            href="/"
            onClick={closeSidebar}
            className="py-2 font-medium hover:text-black"
          >
            Inicio
          </Link>

          <div>
            <button
              type="button"
              onClick={() => setOpenProducts(!openProducts)}
              className="flex items-center justify-between w-full py-2 font-medium hover:text-black transition-transform"
              aria-expanded={openProducts}
            >
              <span>Productos</span>
              <ChevronRight
                className={`w-4 h-4 transition-transform duration-300 ${
                  openProducts ? "rotate-90" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                openProducts ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pl-4 mt-1 flex flex-col gap-2">
                <Link
                  href="/products/featured"
                  onClick={closeSidebar}
                  className="hover:underline"
                >
                  Destacados
                </Link>
                <Link
                  href="/products/sale"
                  onClick={closeSidebar}
                  className="hover:underline"
                >
                  Ofertas
                </Link>
                <hr className="my-2" />
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.id}`}
                    onClick={closeSidebar}
                    className="hover:underline"
                  >
                    {cat.name}
                  </Link>
                ))}
                <Link
                  href="/products"
                  className="font-semibold hover:underline"
                  onClick={closeSidebar}
                >
                  Ver todo
                </Link>
              </div>
            </div>
          </div>
          <Link
            href="/info"
            onClick={closeSidebar}
            className="py-2 font-medium hover:text-black"
          >
            Información
          </Link>
        </nav>
      </div>

      <div ref={cartPreviewRef}>
        <CartPreview
          open={cartPreviewOpen}
          onClose={() => setCartPreviewOpen(false)}
        />
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-xl text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              ¿Deseás cerrar sesión?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:opacity-90 transition"
                type="button"
              >
                Cerrar sesión
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-100 transition"
                type="button"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
