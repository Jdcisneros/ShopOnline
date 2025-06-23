import { FaCreditCard, FaMoneyBillWave, FaTruck } from "react-icons/fa";

export function PaymentMethods() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl font-semibold text-gray-900 text-center mb-10">
        Formas de pago
      </h2>

      <div className="flex w-full">
        {[
          {
            icon: <FaCreditCard className="text-3xl text-gray-700 mb-2" />,
            label: "Tarjeta de crédito / débito",
          },
          {
            icon: <FaMoneyBillWave className="text-3xl text-gray-700 mb-2" />,
            label: "Transferencia o efectivo",
          },
          {
            icon: <FaTruck className="text-3xl text-gray-700 mb-2" />,
            label: "Pago contra entrega",
          },
        ].map(({ icon, label }, i) => (
          <div
            key={i}
            className="flex-1 min-w-0 flex flex-col items-center justify-center px-4"
          >
            {icon}
            <p className="mt-2 text-base font-medium text-gray-800 text-center">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
