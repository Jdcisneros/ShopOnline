"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";

export default function ProfileHome() {
  const [favoritesCount, setFavoritesCount] = useState<number | null>(null);
  const [ordersCount, setOrdersCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [favRes, orderRes] = await Promise.all([
          fetch("/api/favorites"),
          fetch("/api/orders"),
        ]);

        if (!favRes.ok || !orderRes.ok) {
          throw new Error("Error fetching data");
        }

        const favData = await favRes.json();
        const orderData = await orderRes.json();

        setFavoritesCount(Array.isArray(favData) ? favData.length : 0);

        if (Array.isArray(orderData)) {
          setOrdersCount(orderData.length);
        } else if (
          orderData &&
          orderData.orders &&
          Array.isArray(orderData.orders)
        ) {
          setOrdersCount(orderData.orders.length);
        } else {
          setOrdersCount(0);
        }
      } catch (error) {
        console.error(error);
        setFavoritesCount(0);
        setOrdersCount(0);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500 text-lg font-medium">
        Cargando datos...
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-800 text-center mb-12">
        Bienvenido a tu perfil
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Últimos pedidos */}
        <Link
          href="profile/orders"
          className="flex cursor-pointer items-center gap-6 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition"
          aria-label="Ver mis pedidos"
        >
          <div className="flex justify-center items-center w-14 h-14 rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-700">
            <ShoppingCart size={28} />
          </div>
          <div>
            <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
              Últimos pedidos
            </h2>
            {ordersCount && ordersCount > 0 ? (
              <p className="text-lg font-semibold text-neutral-900">
                Tenés {ordersCount} pedido{ordersCount > 1 ? "s" : ""}
              </p>
            ) : (
              <p className="text-neutral-600">No hay pedidos recientes.</p>
            )}
          </div>
        </Link>

        {/* Favoritos */}
        <Link
          href="profile/favorites"
          className="flex cursor-pointer items-center gap-6 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition"
          aria-label="Ver mis productos favoritos"
        >
          <div className="flex justify-center items-center w-14 h-14 rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-700">
            <Heart size={28} />
          </div>
          <div>
            <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
              Productos favoritos
            </h2>
            {favoritesCount && favoritesCount > 0 ? (
              <p className="text-lg font-semibold text-neutral-900">
                Tenés {favoritesCount} producto{favoritesCount > 1 ? "s" : ""}{" "}
                guardado{favoritesCount > 1 ? "s" : ""}
              </p>
            ) : (
              <p className="text-neutral-600">No tienes productos favoritos.</p>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
