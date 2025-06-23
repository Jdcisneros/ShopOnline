/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, useWatch } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { CircleX } from "lucide-react";

type Category = { id: string; name: string };
type Size = { id: string; name: string };
type Color = { id: string; name: string; hex: string };

type VariantInput = {
  sizeId: string;
  colorId: string;
  stock: number;
};

type FormData = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  sizesIds: string[];
  colorsIds: string[];
  variants: VariantInput[]; // stock individual por variante
  newSize?: string;
  newColor?: string;
  newColorHex?: string;
};

export default function NewProductModal({
  product,
  onClose,
}: {
  product?: any;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      imageUrl: product?.imageUrl || "",
      categoryId: product?.categoryId || "",
      sizesIds: product?.variants
        ? Array.from(new Set(product.variants.map((v: any) => v.sizeId)))
        : [],
      colorsIds: product?.variants
        ? Array.from(new Set(product.variants.map((v: any) => v.colorId)))
        : [],
      variants:
        product?.variants?.map((v: any) => ({
          sizeId: v.sizeId,
          colorId: v.colorId,
          stock: v.stock ?? 0,
        })) || [],
      newSize: "",
      newColor: "",
      newColorHex: "#000000",
    },
  });

  const modalRef = useRef<HTMLDivElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [loadingSize, setLoadingSize] = useState(false);
  const [loadingColor, setLoadingColor] = useState(false);

  // Obtenemos tamaños y colores seleccionados para calcular variantes
  const sizesIds = useWatch({ control, name: "sizesIds" });
  const colorsIds = useWatch({ control, name: "colorsIds" });
  const variants = useWatch({ control, name: "variants" });

  // Cargar categorías, talles y colores
  useEffect(() => {
    async function load() {
      const [catRes, sizeRes, colorRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/sizes"),
        fetch("/api/colors"),
      ]);
      setCategories(await catRes.json());
      setSizes(await sizeRes.json());
      setColors(await colorRes.json());
    }
    load();
  }, []);

  // Cada vez que cambian talles o colores, generamos variantes nuevas si faltan
  useEffect(() => {
    if (!sizesIds || !colorsIds) return;

    const newVariants: VariantInput[] = [];

    for (const sizeId of sizesIds) {
      for (const colorId of colorsIds) {
        const existingVariant = variants?.find(
          (v) => v.sizeId === sizeId && v.colorId === colorId
        );
        newVariants.push({
          sizeId,
          colorId,
          stock: existingVariant ? existingVariant.stock : 0,
        });
      }
    }
    setValue("variants", newVariants, { shouldValidate: true });
  }, [sizesIds, colorsIds]);

  // Funciones toggle para talles y colores
  function toggleSize(id: string) {
    if (sizesIds.includes(id)) {
      setValue(
        "sizesIds",
        sizesIds.filter((s) => s !== id),
        { shouldValidate: true }
      );
    } else {
      setValue("sizesIds", [...sizesIds, id], { shouldValidate: true });
    }
  }
  function toggleColor(id: string) {
    if (colorsIds.includes(id)) {
      setValue(
        "colorsIds",
        colorsIds.filter((c) => c !== id),
        { shouldValidate: true }
      );
    } else {
      setValue("colorsIds", [...colorsIds, id], { shouldValidate: true });
    }
  }

  // Agregar talle nuevo
  async function addNewSize(newSizeName: string) {
    if (!newSizeName.trim()) return;
    setLoadingSize(true);
    try {
      const res = await fetch("/api/sizes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newSizeName.trim() }),
      });
      if (!res.ok) throw new Error("Error agregando talle");
      const newSize = await res.json();
      setSizes((prev) => [...prev, newSize]);
      setValue("sizesIds", [...sizesIds, newSize.id], { shouldValidate: true });
      setValue("newSize", "");
      toast.success(`Talle "${newSize.name}" agregado`);
    } catch {
      toast.error("Error al agregar talle");
    } finally {
      setLoadingSize(false);
    }
  }

  // Agregar color nuevo
  async function addNewColor(newColorName: string, newColorHex: string) {
    if (!newColorName.trim() || !newColorHex) return;
    setLoadingColor(true);
    try {
      const res = await fetch("/api/colors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newColorName.trim(), hex: newColorHex }),
      });
      if (!res.ok) throw new Error("Error agregando color");
      const newColor = await res.json();
      setColors((prev) => [...prev, newColor]);
      setValue("colorsIds", [...colorsIds, newColor.id], {
        shouldValidate: true,
      });
      setValue("newColor", "");
      setValue("newColorHex", "#000000");
      toast.success(`Color "${newColor.name}" agregado`);
    } catch {
      toast.error("Error al agregar color");
    } finally {
      setLoadingColor(false);
    }
  }

  async function onSubmit(data: FormData) {
    try {
      // Validaciones simples
      if (data.sizesIds.length === 0) {
        toast.error("Selecciona al menos un talle");
        return;
      }
      if (data.colorsIds.length === 0) {
        toast.error("Selecciona al menos un color");
        return;
      }
      if (!data.variants || data.variants.length === 0) {
        toast.error("No hay variantes para guardar");
        return;
      }
      // Validar que stock no sea negativo
      for (const v of data.variants) {
        if (v.stock < 0) {
          toast.error("El stock no puede ser negativo");
          return;
        }
      }

      // Enviar datos al backend
      const res = await fetch(
        product ? `/api/products/${product.id}` : "/api/products",
        {
          method: product ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) throw new Error("Error guardando producto");
      toast.success(product ? "Producto actualizado" : "Producto creado");
      onClose();
      reset();
    } catch {
      toast.error("Error al guardar producto");
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-40 backdrop-blur-xs" />

      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-6 "
        onClick={onClose}
      >
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className="
        relative
        bg-white
        rounded-3xl
        w-full max-w-4xl
        max-h-[90vh]
        overflow-y-auto
        p-10
        shadow-2xl
        flex flex-col gap-8
        font-sans
        text-gray-900
      "
          style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
        >
          <button
            onClick={onClose}
            className="
          absolute top-6 right-6
          text-gray-400 hover:text-gray-700
          focus:outline-none focus:ring-2 focus:ring-gray-500 rounded
          transition-colors
          p-1
        "
            aria-label="Cerrar modal"
            type="button"
          >
            <CircleX size={28} />
          </button>
          <h2 className="text-3xl font-extrabold tracking-tight">
            {product ? "Editar Producto" : "Nuevo Producto"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Nombre + Categoría */}
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[220px] max-w-sm">
                <label className="block mb-1 font-semibold text-gray-700">
                  Nombre
                </label>
                <input
                  {...register("name", { required: "Nombre requerido" })}
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={isSubmitting}
                  placeholder="Nombre"
                />
                {errors.name && (
                  <p className="text-red-600 mt-1 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex-1 min-w-[180px] max-w-xs">
                <label className="block mb-1 font-semibold text-gray-700">
                  Categoría
                </label>
                <select
                  {...register("categoryId", {
                    required: "Categoría requerida",
                  })}
                  disabled={isSubmitting}
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.categoryId ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Selecciona</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-red-600 mt-1 text-sm">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>
            </div>

            {/* Precio + Imagen */}
            <div className="flex flex-wrap gap-4">
              <div className="min-w-[120px] max-w-[150px]">
                <label className="block mb-1 font-semibold text-gray-700">
                  Precio
                </label>
                <input
                  {...register("price", {
                    required: true,
                    valueAsNumber: true,
                    min: 0,
                  })}
                  type="number"
                  step="0.01"
                  disabled={isSubmitting}
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Ej: 100.00"
                />
                {errors.price && (
                  <p className="text-red-600 mt-1 text-sm">Precio inválido</p>
                )}
              </div>

              <div className="flex-1 min-w-[220px] max-w-md">
                <label className="block mb-1 font-semibold text-gray-700">
                  Imagen
                </label>
                <input
                  {...register("imageUrl", { required: "URL requerida" })}
                  type="url"
                  disabled={isSubmitting}
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.imageUrl ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                {errors.imageUrl && (
                  <p className="text-red-600 mt-1 text-sm">
                    {errors.imageUrl.message}
                  </p>
                )}
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Descripción
              </label>
              <textarea
                {...register("description", {
                  required: "Descripción requerida",
                })}
                disabled={isSubmitting}
                className="w-full border rounded p-2"
                rows={3}
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Talles */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Talles
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {sizes.map((size) => (
                  <button
                    type="button"
                    key={size.id}
                    onClick={() => toggleSize(size.id)}
                    className={`px-4 py-2 rounded-full border font-medium transition ${
                      sizesIds.includes(size.id)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                    disabled={isSubmitting}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  placeholder="Nuevo talle"
                  disabled={isSubmitting || loadingSize}
                  value={watch("newSize") || ""}
                  onChange={(e) => setValue("newSize", e.target.value)}
                  className="flex-grow border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
                <button
                  type="button"
                  disabled={
                    isSubmitting || loadingSize || !watch("newSize")?.trim()
                  }
                  onClick={() => addNewSize(watch("newSize") || "")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold disabled:opacity-50 hover:bg-green-700 transition"
                >
                  Agregar
                </button>
              </div>
            </div>

            {/* Colores */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Colores
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {colors.map((color) => (
                  <button
                    type="button"
                    key={color.id}
                    onClick={() => toggleColor(color.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border font-medium transition ${
                      colorsIds.includes(color.id)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                    disabled={isSubmitting}
                  >
                    <span
                      className="w-5 h-5 rounded-full border"
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.name}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  placeholder="Nuevo color"
                  disabled={isSubmitting || loadingColor}
                  value={watch("newColor") || ""}
                  onChange={(e) => setValue("newColor", e.target.value)}
                  className="flex-grow border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
                <input
                  type="color"
                  disabled={isSubmitting || loadingColor}
                  value={watch("newColorHex") || "#000000"}
                  onChange={(e) => setValue("newColorHex", e.target.value)}
                  className="w-12 h-10 border rounded-lg cursor-pointer"
                  title="Seleccionar color"
                />
                <button
                  type="button"
                  disabled={
                    isSubmitting || loadingColor || !watch("newColor")?.trim()
                  }
                  onClick={() =>
                    addNewColor(
                      watch("newColor") || "",
                      watch("newColorHex") || "#000000"
                    )
                  }
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold disabled:opacity-50 hover:bg-green-700 transition"
                >
                  Agregar
                </button>
              </div>
            </div>

            {/* Variantes */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Variantes (Stock por combinación)
              </label>
              {sizesIds.length === 0 || colorsIds.length === 0 ? (
                <p className="italic text-gray-500">
                  Selecciona al menos un talle y un color
                </p>
              ) : (
                <div className="overflow-x-auto max-h-[250px] border rounded-lg">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-3 py-2">Talle</th>
                        <th className="border px-3 py-2">Color</th>
                        <th className="border px-3 py-2">Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {variants.map((v, idx) => {
                        const size = sizes.find((s) => s.id === v.sizeId);
                        const color = colors.find((c) => c.id === v.colorId);
                        return (
                          <tr
                            key={`${v.sizeId}-${v.colorId}`}
                            className="even:bg-gray-50"
                          >
                            <td className="border px-3 py-2">
                              {size?.name || v.sizeId}
                            </td>
                            <td className="border px-3 py-2 flex items-center gap-3">
                              <span
                                className="w-5 h-5 rounded-full border"
                                style={{
                                  backgroundColor: color?.hex || "#000",
                                }}
                              />
                              {color?.name || v.colorId}
                            </td>
                            <td className="border px-3 py-2">
                              <input
                                type="number"
                                min={0}
                                {...register(`variants.${idx}.stock`, {
                                  required: true,
                                  valueAsNumber: true,
                                  min: 0,
                                })}
                                disabled={isSubmitting}
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  reset();
                  onClose();
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-semibold"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 hover:bg-blue-700 transition"
              >
                {isSubmitting
                  ? "Guardando..."
                  : product
                  ? "Actualizar"
                  : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
