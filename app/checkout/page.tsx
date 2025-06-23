"use client";

import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const shippingCost = 1000; // Fijo por ahora
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingCost;

  const handleSubmit = async () => {
    if (!address.trim()) {
      alert("Por favor ingresa una dirección.");
      return;
    }

    const formattedItems = items.map((item) => ({
      productId: item.productId, // <-- OJO que venga así, no solo `id`
      variantId: item.id, // variante viene en `id`
      quantity: item.quantity,
      price: item.price,
    }));

    const order = {
      items: formattedItems,
      address,
      paymentMethod,
    };

    console.log("Orden a enviar:", order);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (res.ok) {
      clearCart();
      router.push("/?modal=success");
    } else {
      alert("Error al generar la orden");
    }
  };

  if (items.length === 0) {
    return <div className="p-6 text-center">Tu carrito está vacío.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Finalizar compra
      </h1>

      {/* Datos del usuario */}
      <section className="bg-white shadow rounded p-4 space-y-2">
        <h2 className="text-xl font-semibold">Datos del cliente</h2>
        <p className="text-gray-700">
          <strong>Nombre:</strong> {session?.user?.name || "Invitado"}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {session?.user?.email || "No disponible"}
        </p>
      </section>

      {/* Dirección */}
      <section className="bg-white shadow rounded p-4 space-y-2">
        <h2 className="text-xl font-semibold">Dirección de envío</h2>
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Ingresá tu dirección..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </section>

      {/* Método de pago */}
      <section className="bg-white shadow rounded p-4 space-y-2">
        <h2 className="text-xl font-semibold">Método de pago</h2>
        <select
          className="border p-2 rounded w-full"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="credit_card">Tarjeta de crédito</option>
          <option value="debit_card">Tarjeta de débito</option>
          <option value="mercado_pago">Mercado Pago</option>
          <option value="cash">Efectivo</option>
        </select>
      </section>

      {/* Resumen del pedido */}
      <section className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-4 border-b pb-4">
              <Image
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 object-cover rounded border"
              />
              <div className="flex-1 space-y-1">
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Talle: <span className="font-medium">{item.size}</span> |
                  Color: <span className="font-medium">{item.color}</span>
                </p>
                <p className="text-sm text-gray-600">
                  {item.quantity} x ${item.price.toFixed(2)}
                </p>
              </div>
              <p className="font-semibold text-right text-gray-900">
                ${(item.quantity * item.price).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-2 text-right text-gray-800">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Costo de envío: ${shippingCost.toFixed(2)}</p>
          <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
        </div>
      </section>

      {/* Botón de compra */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded text-lg hover:bg-blue-700 transition"
      >
        Confirmar compra
      </button>
    </div>
  );
}
