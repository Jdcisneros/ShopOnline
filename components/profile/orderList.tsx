"use client";

import { useEffect, useState } from "react";

type OrderItem = {
  id: string;
  product: {
    name: string;
    imageUrl: string;
  };
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  createdAt: string;
  total: number;
  status: string;
  items: OrderItem[];
};

export default function OrdersList({ userId }: { userId: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`/api/orders/user/${userId}`);
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, [userId]);

  if (loading) return <p>Cargando pedidos...</p>;
  if (orders.length === 0) return <p>No hay pedidos aún.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Mis pedidos</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded p-4 shadow">
            <div className="mb-2 text-gray-700">
              <strong>Fecha:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()} |
              <strong className="ml-2">Estado:</strong> {order.status}
            </div>
            <ul className="space-y-1">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.quantity}x {item.product.name}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 font-bold">
              Total: ${order.total.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
