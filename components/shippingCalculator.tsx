"use client";

import { useState } from "react";
import { Truck } from "lucide-react"; // Usamos un ícono sutil

export default function ShippingCalculator() {
  const [postalCode, setPostalCode] = useState("");
  const [cost, setCost] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    setError("");
    setCost(null);

    if (!postalCode.trim()) {
      setError("Ingresá un código postal.");
      return;
    }

    const simulatedCost = 1500 + Math.floor(Math.random() * 2000);
    setCost(simulatedCost);
  };

  return (
    <div className="mt-6 space-y-2">
      <label
        htmlFor="postal"
        className="text-sm text-gray-700 font-medium flex items-center gap-1"
      >
        <Truck className="w-4 h-4 text-gray-400" />
        Costo de envío
      </label>

      <div className="flex items-center gap-2">
        <input
          id="postal"
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Código postal"
          className="w-32 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <button
          onClick={handleCalculate}
          className="px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
          Calcular
        </button>
      </div>

      {error && <p className="text-sm text-gray-500">{error}</p>}
      {cost !== null && (
        <p className="text-sm text-gray-700">
          Envío estimado: <span className="font-medium">${cost}</span>
        </p>
      )}
    </div>
  );
}