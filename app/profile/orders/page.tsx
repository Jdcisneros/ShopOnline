import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: true,
          variant: {
            include: {
              size: true,
              color: true,
            },
          },
        },
      },
    },
  });

  if (orders.length === 0) {
    return (
      <div className="text-center text-gray-500 text-lg py-20">
        No tenés pedidos todavía.
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8 tracking-tight text-neutral-800">
        Mis pedidos
      </h1>
      <ul className="space-y-6">
        {orders.map((order) => (
          <li
            key={order.id}
            className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-neutral-700">
                Pedido #{order.id.slice(0, 8)}
              </p>
              {/* Como no tenés status, lo removemos */}
              <span className="text-xs font-medium text-neutral-500">
                {/* o podés dejar "Completado", "Procesado", etc. */}
                Confirmado
              </span>
            </div>
            <p className="text-xs text-neutral-500 mb-4">
              Fecha: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <ul className="divide-y divide-neutral-200 text-sm">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between py-2">
                  <span className="text-neutral-700">
                    {item.product.name}{" "}
                    {item.variant && (
                      <span className="text-neutral-400">
                        (Talle: {item.variant.size.name}, Color:{" "}
                        {item.variant.color.name})
                      </span>
                    )}{" "}
                    <span className="text-neutral-400">(x{item.quantity})</span>
                  </span>
                  <span className="text-neutral-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="text-right mt-4 font-semibold text-neutral-900">
              Total: ${order.total.toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
