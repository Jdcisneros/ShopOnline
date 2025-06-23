/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type Order = {
  id: string;
  user: { email: string } | null;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    sizeName?: string | null;
    colorName?: string | null;
    colorHex?: string | null;
  }[];
  createdAt: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        const processed = data.map((order: any) => ({
          ...order,
          items: order.items.map((item: any) => ({
            ...item,
            sizeName: item.variant?.sizeName || null,
            colorName: item.variant?.colorName || null,
            colorHex: item.variant?.colorHex || null,
            variant: undefined,
          })),
        }));
        setOrders(processed);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto ">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Pedidos</h1>

      <div className="rounded-lg shadow-md ring-1 ring-gray-300 min-h-[240px] bg-white">
        {loading ? (
          <div className="flex justify-center items-center pt-24 text-gray-400 text-lg font-semibold">
            Cargando órdenes...
          </div>
        ) : orders.length === 0 ? (
          <div className="flex justify-center items-center pt-24 text-gray-400 text-lg font-semibold">
            No hay órdenes disponibles.
          </div>
        ) : (
          <>
            {/* Tabla para desktop */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full text-gray-700 text-sm border-collapse">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs select-none">
                  <tr>
                    <th className="px-5 py-3 text-left font-medium">ID</th>
                    <th className="px-5 py-3 text-left font-medium">Usuario</th>
                    <th className="px-5 py-3 text-center font-medium">Items</th>
                    <th className="px-5 py-3 text-right font-medium">Total</th>
                    <th className="px-5 py-3 text-left font-medium">Fecha</th>
                    <th className="px-5 py-3 text-center font-medium">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const total = order.items.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    );
                    return (
                      <tr
                        key={order.id}
                        className="border-t border-gray-200 hover:bg-indigo-50 transition cursor-pointer"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <td className="px-5 py-4 font-mono text-indigo-900">
                          {order.id.slice(0, 8)}…
                        </td>
                        <td className="px-5 py-4">
                          {order.user?.email || "Sin usuario"}
                        </td>
                        <td className="px-5 py-4 text-center font-semibold">
                          {order.items.length}
                        </td>
                        <td className="px-5 py-4 text-right font-semibold text-indigo-700">
                          ${total.toFixed(2)}
                        </td>
                        <td className="px-5 py-4">
                          {format(new Date(order.createdAt), "PPP", {
                            locale: es,
                          })}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 font-semibold text-sm px-3 py-1 rounded-md bg-indigo-100 hover:bg-indigo-200 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrder(order);
                            }}
                          >
                            Ver detalles
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Tarjetas para mobile */}
            <div className="md:hidden p-3 space-y-4">
              {orders.map((order) => {
                const total = order.items.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                );
                return (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="border rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer"
                  >
                    <p className="text-sm text-gray-500 font-mono">
                      <strong>ID:</strong> {order.id.slice(0, 8)}…
                    </p>
                    <p className="text-sm">
                      <strong>Usuario:</strong>{" "}
                      {order.user?.email || "Sin usuario"}
                    </p>
                    <p className="text-sm">
                      <strong>Items:</strong> {order.items.length}
                    </p>
                    <p className="text-sm">
                      <strong>Total:</strong>{" "}
                      <span className="text-indigo-700 font-semibold">
                        ${total.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-sm">
                      <strong>Fecha:</strong>{" "}
                      {format(new Date(order.createdAt), "PPP", { locale: es })}
                    </p>
                    <button
                      className="mt-3 text-indigo-600 hover:text-indigo-900 font-medium text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                      }}
                    >
                      Ver detalles
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* MODAL */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs p-4 sm:p-6"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                🧾 Detalle del Pedido
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                aria-label="Cerrar"
                className="text-gray-600 hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Info Usuario y Fecha */}
            <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3 text-sm sm:text-base">
              <p>
                <strong>Usuario:</strong>{" "}
                {selectedOrder.user?.email || "Sin usuario"}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {format(new Date(selectedOrder.createdAt), "PPP", {
                  locale: es,
                })}
              </p>
              <p className="text-base sm:text-lg font-semibold">
                <strong>Total:</strong> $
                {selectedOrder.items
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>

            {/* Lista de Items */}
            <ul className="divide-y divide-gray-200">
              {selectedOrder.items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center py-4 gap-4"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md border"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-1">
                      {item.sizeName && (
                        <span>
                          <strong>Talle:</strong> {item.sizeName}
                        </span>
                      )}
                      {item.colorName && (
                        <span className="flex items-center gap-1">
                          <strong>Color:</strong>
                          <span
                            className="w-5 h-5 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.colorHex || "#fff" }}
                            title={item.colorName}
                            aria-label={item.colorName}
                          />
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-gray-700 text-sm">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <p className="font-bold text-indigo-700 text-lg sm:text-right sm:min-w-[90px]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
