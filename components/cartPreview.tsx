"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { X, Trash2, ShoppingCart, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function CartPreview({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const items = useCartStore((state) => state.items);
  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const increase = useCartStore((state) => state.increaseQuantity);
  const decrease = useCartStore((state) => state.decreaseQuantity);
  const remove = useCartStore((state) => state.removeItem);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition duration-300 ease-in-out 
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <div className="absolute inset-0" />

      <aside
        ref={panelRef}
        className={`relative bg-white w-full max-w-lg h-full px-8 py-8 shadow-xl overflow-y-auto flex flex-col border-l border-gray-200 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-gray-500 hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-8 border-b pb-4">Tu Carrito</h2>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <ShoppingCart className="w-20 h-20 text-gray-300 mb-6" />
            <p className="text-xl font-medium text-gray-700 mb-2">
              Tu carrito está vacío
            </p>
            <p className="text-gray-500 mb-6 text-sm">
              Agregá productos para verlos acá
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-900"
            >
              Seguir comprando
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-6 overflow-auto">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="bg-gray-50 rounded-xl p-4 flex gap-4 items-start shadow-sm"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900 text-base leading-snug line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className="block">
                            Talle:{" "}
                            <span className="font-medium text-gray-700">
                              {item.size}
                            </span>
                          </span>
                          <span className="block">
                            Color:{" "}
                            <span className="font-medium text-gray-700">
                              {item.color}
                            </span>
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={() => remove(item.id)}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() => decrease(item.id)}
                          disabled={item.quantity <= 1}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-200 disabled:text-gray-300"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="px-4 py-1 bg-white text-gray-800 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increase(item.id)}
                          disabled={item.quantity >= item.stock}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-200 disabled:text-gray-300"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                      <p className="text-gray-800 font-semibold text-sm whitespace-nowrap">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t pt-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full text-center bg-black text-white py-3 rounded-full hover:bg-gray-800 transition"
              >
                Iniciar compra
              </Link>

              <button
                onClick={onClose}
                className="block w-full text-sm text-gray-600 hover:underline text-center"
              >
                Seguir comprando
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
