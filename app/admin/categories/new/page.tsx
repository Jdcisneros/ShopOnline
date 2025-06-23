"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Debe tener al menos 2 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function NewCategoryPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError("");

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.status === 409) {
      setServerError("Esa categoría ya existe.");
      return;
    }

    if (!res.ok) {
      setServerError("Error al crear la categoría.");
      return;
    }

    router.push("/admin/categories");
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Nueva Categoría</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Nombre</label>
          <input
            {...register("name")}
            className="w-full border p-2 rounded"
            type="text"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {serverError && (
          <p className="text-red-600 text-sm mt-2">{serverError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Guardando..." : "Crear Categoría"}
        </button>
      </form>
    </div>
  );
}
