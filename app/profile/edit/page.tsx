"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
    }
  }, [session]);

  if (!session) return <p className="text-center py-10">No autorizado</p>;

  const handleUpdateData = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const res = await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify({ name, email }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Datos actualizados correctamente");
    } else {
      setError(data.error || "Error al actualizar datos");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas nuevas no coinciden");
      return;
    }

    if (newPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres");
      return;
    }

    const res = await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify({ currentPassword, newPassword }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Contraseña actualizada correctamente");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setError(data.error || "Error al cambiar la contraseña");
    }
  };

  return (
    <div className="space-y-12 max-w-3xl mx-auto">
      {/* Actualizar datos */}
      <section>
        <h2 className="text-xl font-semibold mb-6 text-neutral-800">
          Datos personales
        </h2>
        <form onSubmit={handleUpdateData} className="space-y-6">
          <div>
            <label className="block text-sm mb-1 text-neutral-600">
              Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-neutral-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-black"
              required
            />
          </div>
          <button
            type="submit"
            className="text-sm font-medium rounded-xl border border-black text-black py-2 px-6 hover:bg-neutral-800 hover:text-white transition"
          >
            Guardar cambios
          </button>
        </form>
      </section>

      {/* Cambiar contraseña */}
      <section>
        <h2 className="text-xl font-semibold mb-6 text-neutral-800">
          Cambiar contraseña
        </h2>
        <form onSubmit={handleChangePassword} className="space-y-6">
          <div>
            <label className="block text-sm mb-1 text-neutral-600">
              Contraseña actual
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-neutral-600">
              Nueva contraseña
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-neutral-600">
              Confirmar nueva contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-black"
              required
            />
          </div>
          <button
            type="submit"
            className="text-sm font-medium rounded-xl border border-black text-black py-2 px-6 hover:bg-neutral-800 hover:text-white transition"
          >
            Cambiar contraseña
          </button>
        </form>
      </section>

      {/* Mensajes */}
      {(message || error) && (
        <div className="text-sm mt-4">
          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}
        </div>
      )}
    </div>
  );
}
