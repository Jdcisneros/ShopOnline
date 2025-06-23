import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Usuarios registrados
      </h1>

      {users.length === 0 ? (
        <p className="text-center text-gray-600 py-10">
          No hay usuarios registrados.
        </p>
      ) : (
        <>
          {/* Tabla (solo visible en md+) */}
          <div className="overflow-x-auto rounded-xl shadow ring-1 ring-gray-200 hidden md:block">
            <table className="w-full text-sm text-gray-700 bg-white">
              <thead className="text-left text-gray-500 uppercase text-xs bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Rol</th>
                  <th className="px-4 py-3">Registrado</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{user.name || "(Sin nombre)"}</td>
                    <td className="px-4 py-3 break-words max-w-xs">
                      {user.email}
                    </td>
                    <td className="px-4 py-3">
                      {user.isAdmin ? (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">
                          Admin
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-gray-200 text-gray-700">
                          Usuario
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {format(new Date(user.createdAt), "PPP", { locale: es })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Vista mobile (solo visible en < md) */}
          <div className="md:hidden space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="border rounded-lg shadow-sm p-4 bg-white"
              >
                <p className="text-sm">
                  <strong>Nombre:</strong> {user.name || "(Sin nombre)"}
                </p>
                <p className="text-sm break-words">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-sm">
                  <strong>Rol:</strong>{" "}
                  {user.isAdmin ? (
                    <span className="text-green-700 font-semibold">Admin</span>
                  ) : (
                    <span className="text-gray-600 font-semibold">Usuario</span>
                  )}
                </p>
                <p className="text-sm">
                  <strong>Registrado:</strong>{" "}
                  {format(new Date(user.createdAt), "PPP", { locale: es })}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
