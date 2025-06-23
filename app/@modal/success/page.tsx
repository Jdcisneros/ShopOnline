"use client";

import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessModal() {
  const router = useRouter();

  return (
    <div className="text-center">
      <CheckCircle className="mx-auto text-green-600 w-16 h-16 mb-4" />
      <h2 className="text-2xl font-bold mb-2">¡Éxito!</h2>
      <p className="mb-6">Tu operación se completó correctamente.</p>
      <button
        onClick={() => router.push("/")}
        className="bg-green-600 text-white px-6 py-2 rounded-lg"
      >
        Volver al inicio
      </button>
    </div>
  );
}
