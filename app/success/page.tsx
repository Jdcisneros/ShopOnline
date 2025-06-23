"use client";

import SuccessModal from "@/components/successModal";
import { useState } from "react";

export default function CheckoutPage() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    // lógica de envío
    // ...
    setShowSuccess(true); // mostrar modal
  };

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Confirmar compra
        </button>
      </div>

      {showSuccess && <SuccessModal />}
    </>
  );
}
