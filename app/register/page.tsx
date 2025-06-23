"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!acceptTerms) {
      toast.error("Debes aceptar la política de privacidad.");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, lastName, phone, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.error || "Error al registrarse");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Formulario */}
      <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
        <form
          onSubmit={handleRegister}
          className="space-y-6 max-w-md mx-auto w-full"
        >
          <div className="space-y-1">
            <label className="text-xs text-gray-500 tracking-wider">
              E-MAIL
            </label>
            <input
              type="email"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-500 tracking-wider">
              CONTRASEÑA
            </label>
            <input
              type="password"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-500 tracking-wider">
              NOMBRE
            </label>
            <input
              type="text"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2 rounded-xl"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-500 tracking-wider">
              APELLIDOS
            </label>
            <input
              type="text"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2 rounded-xl"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-500 tracking-wider">
              TELÉFONO
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                value="+54"
                disabled
                className="w-16 border-b border-gray-300 py-2 bg-transparent text-center rounded-xl"
              />
              <input
                type="tel"
                className="flex-1 border-b border-gray-300 focus:outline-none focus:border-black py-2 rounded-xl"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-1"
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <label className="text-sm text-gray-600">
              He podido leer y entiendo la{" "}
              <a href="/politica" className="underline text-black">
                Política de Privacidad y Cookies
              </a>
            </label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="text-sm font-medium rounded-xl border duration-200 border-black text-black py-2 px-6 w-full hover:bg-neutral-800 hover:text-white transition"
          >
            CREAR CUENTA
          </button>

          {/* Botones adicionales */}
          <div className="flex justify-between text-sm mt-4 text-gray-600">
            <Link href="/" className="hover:underline">
              ← Volver al inicio
            </Link>
            <Link href="/login" className="hover:underline">
              ¿Ya tienes cuenta? Inicia sesión →
            </Link>
          </div>
        </form>
      </div>

      {/* Imagen lateral */}
      <div className="hidden md:block w-full relative">
        <Image
          src="/carousel/image1.jpg"
          alt="Registro"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
