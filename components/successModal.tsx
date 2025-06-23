"use client";

import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessModal() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm text-center">
        <CheckCircle className="mx-auto text-green-600 w-16 h-16 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Éxito!</h2>
        <p className="text-gray-600 mb-6">
          Tu operación se completó correctamente.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
