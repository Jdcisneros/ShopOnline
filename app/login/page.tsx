"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/");
    } else {
      setError("Email o contraseña incorrectos");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Formulario login */}
      <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Iniciar sesión
        </h1>
        <form
          onSubmit={handleLogin}
          className="space-y-6 max-w-md mx-auto w-full"
        >
          <div className="space-y-1">
            <label className="text-xs text-gray-500 tracking-wider">
              E-MAIL
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-500 tracking-wider">
              CONTRASEÑA
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />{" "}
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="text-sm font-medium rounded-xl border duration-200 border-black text-black py-2 px-6 w-full hover:bg-neutral-800 hover:text-white transition"
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>
          <div className="flex justify-between text-sm mt-4 text-gray-600">
            <Link href="/" className="hover:underline">
              ← Volver al inicio
            </Link>
            <Link href="/register" className="hover:underline">
              ¿No tenés cuenta? Registrate →
            </Link>
          </div>
        </form>
      </div>

      {/* Imagen a la derecha */}
      <div className="hidden md:block w-full relative">
        <Image
          src="/carousel/image1.jpg"
          alt="login"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
