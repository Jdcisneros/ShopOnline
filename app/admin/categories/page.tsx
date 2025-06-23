"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Debe tener al menos 2 caracteres"),
});

type FormData = z.infer<typeof schema>;
type Category = { id: string; name: string };

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal states
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [creating, setCreating] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCategories(data);
    } catch {
      toast.error("Error al cargar categorías");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setValue("name", category.name);
  };

  const closeModals = () => {
    setDeleteId(null);
    setEditingCategory(null);
    setCreating(false);
    reset();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/categories/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      toast.success("Categoría eliminada");
      fetchCategories();
    } catch {
      toast.error("Error al eliminar la categoría");
    } finally {
      closeModals();
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(
        editingCategory
          ? `/api/categories/${editingCategory.id}`
          : "/api/categories",
        {
          method: editingCategory ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (res.status === 409) {
        toast.error("Esa categoría ya existe.");
        return;
      }

      if (!res.ok) throw new Error();

      toast.success(
        editingCategory ? "Categoría actualizada" : "Categoría creada"
      );
      fetchCategories();
      closeModals();
    } catch {
      toast.error("Error al guardar la categoría");
    }
  };

  return (
    <div className="p-6 mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Categorías</h1>
        <button
          onClick={() => setCreating(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition focus-visible:outline focus-visible:outline-indigo-600"
        >
          + Nueva categoría
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow ring-1 ring-gray-200 min-h-[200px]">
        {loading ? (
          <div className="flex justify-center items-center p-20 text-gray-500 font-semibold text-lg">
            Cargando categorías...
          </div>
        ) : categories.length === 0 ? (
          <div className="flex justify-center items-center p-20 text-gray-500 font-semibold text-lg">
            No hay categorías disponibles.
          </div>
        ) : (
          <table className="w-full text-sm text-gray-700 bg-white">
            <thead className="text-left text-gray-500 uppercase text-xs bg-gray-50">
              <tr>
                <th className="px-4 py-3 break-words max-w">Nombre</th>
                <th className="px-4 py-3 break-words w-48">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  <td className="p-3">{cat.name}</td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setDeleteId(cat.id)}
                      className="bg-gray-800 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ✅ Modal Crear / Editar */}
      {(creating || editingCategory) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl space-y-5"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {editingCategory ? "Editar categoría" : "Nueva categoría"}
            </h2>

            <div>
              <label className="block text-sm font-semibold mb-1">Nombre</label>
              <input
                {...register("name")}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={closeModals}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                {isSubmitting
                  ? "Guardando..."
                  : editingCategory
                  ? "Guardar cambios"
                  : "Crear categoría"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ✅ Modal eliminar */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              ¿Eliminar categoría?
            </h2>
            <p className="mb-6 text-gray-700">
              Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={handleDelete}
                className="bg-gray-800 text-white hover:bg-red-600 px-6 py-3 rounded-md font-semibold shadow transition"
              >
                Sí, eliminar
              </button>
              <button
                onClick={closeModals}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-semibold shadow transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
