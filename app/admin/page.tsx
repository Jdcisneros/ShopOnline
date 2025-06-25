"use client";

import Link from "next/link";
import { useRequireAuth } from "@/hooks/useRequireAuth";

const navItems = [
  { label: "Productos", href: "/admin/products" },
  { label: "Pedidos", href: "/admin/orders" },
  { label: "Usuarios", href: "/admin/users" },
  { label: "Categorías", href: "/admin/categories" },
  { label: "Destacados", href: "/admin/products/featured" },
  { label: "En Oferta", href: "/admin/products/sale" },
];

export default function AdminPage() {
  useRequireAuth({ adminOnly: true, redirectTo: "/admin/login" });

  return (
    <>
      <section className="mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Bienvenido al Panel de Administración
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
          Desde aquí podrás gestionar productos, pedidos, usuarios, categorías y
          otras configuraciones de tu tienda.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {navItems.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="block border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">
                {label}
              </h3>
              <p className="text-gray-700">
                {label === "Productos" && "Gestiona tu catálogo y stock."}
                {label === "Pedidos" &&
                  "Revisa y administra los pedidos recibidos."}
                {label === "Usuarios" && "Controla el acceso y los roles."}
                {label === "Categorías" &&
                  "Organiza tus productos por categorías."}
                {label === "Destacados" && "Selecciona productos destacados."}
                {label === "En Oferta" &&
                  "Gestiona promociones y ofertas especiales."}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
