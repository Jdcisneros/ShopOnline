import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import {
  CurrencyDollarIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.isAdmin) redirect("/");

  const [products, users, orders] = await Promise.all([
    prisma.product.count(),
    prisma.user.count(),
    prisma.order.findMany({ include: { items: true } }),
  ]);

  const totalSales = orders.reduce((sum, order) => {
    const orderTotal = order.items.reduce((itemSum, item) => {
      return itemSum + Number(item.price) * item.quantity;
    }, 0);
    return sum + orderTotal;
  }, 0);

  const stats = [
    {
      id: 1,
      label: "Productos",
      value: products,
      icon: CubeIcon,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      id: 2,
      label: "Usuarios",
      value: users,
      icon: UserGroupIcon,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      id: 3,
      label: "Pedidos",
      value: orders.length,
      icon: ShoppingBagIcon,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      id: 4,
      label: "Ventas Totales",
      value: `$${totalSales.toFixed(2)}`,
      icon: CurrencyDollarIcon,
      color: "text-indigo-500",
      bgColor: "bg-indigo-100",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-10 text-gray-900">
        Panel de Administración
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ id, label, value, icon: Icon, color, bgColor }) => (
          <div
            key={id}
            className="flex items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className={`p-3 rounded-full ${bgColor} mr-4`}>
              <Icon className={`h-8 w-8 ${color}`} />
            </div>
            <div>
              <p className="text-gray-500 font-medium">{label}</p>
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
