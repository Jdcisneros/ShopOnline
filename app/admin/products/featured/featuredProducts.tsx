"use client";

import ProductFilters from "@/components/productFilters";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { DollarSign, Star} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  featured: boolean;
  imageUrl: string;
  categoryId: string;
  inStock: boolean;
}

interface Filters {
  searchText?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy?: "price-asc" | "price-desc" | "name-asc" | "name-desc";
}

export default function FeaturedProductsClient({
  products: initialProducts,
  categories,
}: {
  products: Product[];
  categories: { id: string; name: string }[];
}) {
  const [filters, setFilters] = useState<Filters>({});
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  useEffect(() => {
    let filtered = [...initialProducts];

    if (filters.categoryId) {
      filtered = filtered.filter((p) => p.categoryId === filters.categoryId);
    }
    if (filters.searchText) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(filters.searchText!.toLowerCase())
      );
    }
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }
    if (filters.inStockOnly) {
      filtered = filtered.filter((p) => p.inStock);
    }

    if (filters.sortBy) {
      if (filters.sortBy === "price-asc")
        filtered.sort((a, b) => a.price - b.price);
      else if (filters.sortBy === "price-desc")
        filtered.sort((a, b) => b.price - a.price);
      else if (filters.sortBy === "name-asc")
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      else if (filters.sortBy === "name-desc")
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setProducts(filtered);
  }, [filters, initialProducts]);

  async function toggleFeatured(id: string, current: boolean) {
    setLoadingIds((prev) => [...prev, id]);
    try {
      const res = await fetch(`/api/products/${id}/featured`, {
        method: "PATCH",
        body: JSON.stringify({ featured: !current }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error();

      const updated = await res.json();

      setProducts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, featured: updated.featured } : p
        )
      );

      toast.success(`Producto "${updated.name}" actualizado.`);
    } catch (error) {
      toast.error("Error al actualizar el estado destacado");
      console.error(error);
    } finally {
      setLoadingIds((prev) => prev.filter((pid) => pid !== id));
    }
  }

  return (
    <div className="p-6 mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Productos Destacados
      </h1>

      <ProductFilters
        categories={categories}
        filters={filters}
        onChange={setFilters}
      />

      <div className="mt-4">
        {/* Contenedor para scroll horizontal en móviles */}
        <div className="overflow-x-auto">
          {/* Tabla para desktop y pantallas grandes */}
          <table className="hidden md:table w-full text-sm text-gray-700 bg-white rounded-lg shadow ring-1 ring-gray-200">
            <thead className="text-left text-gray-500 uppercase text-xs bg-gray-50">
              <tr>
                <th className="px-4 py-3">Imagen</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3 flex items-center gap-1">
                  <DollarSign className="w-4 h-4 inline" />
                  Precio
                </th>
                <th className="px-4 py-3">Destacado</th>
              </tr>
            </thead>
            <tbody>
              {products.map(({ id, name, price, featured, imageUrl }) => (
                <tr
                  key={id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">
                    <Image
                      src={imageUrl}
                      alt={name}
                      width={50}
                      height={50}
                      className="rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-3">{name}</td>
                  <td className="px-4 py-3 flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-gray-600" />$
                    {price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={featured}
                        disabled={loadingIds.includes(id)}
                        onChange={() => toggleFeatured(id, featured)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:bg-blue-600 transition-colors duration-300 ease-in-out" />
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ease-in-out peer-checked:translate-x-5" />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Lista para móviles (pantallas pequeñas) */}
          <div className="md:hidden space-y-4">
            {products.map(({ id, name, price, featured, imageUrl }) => (
              <div
                key={id}
                className="flex flex-col border rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex items-center space-x-4 mb-2">
                  <Image
                    src={imageUrl}
                    alt={name}
                    width={60}
                    height={60}
                    className="rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{name}</p>
                    <p className="flex items-center gap-1 text-gray-600">
                      <DollarSign className="w-4 h-4" />${price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <label className="flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={featured}
                    disabled={loadingIds.includes(id)}
                    onChange={() => toggleFeatured(id, featured)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:bg-blue-600 transition-colors duration-300 ease-in-out" />
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ease-in-out peer-checked:translate-x-5" />
                  <Star
                    className={`ml-3 w-5 h-5 ${
                      featured ? "text-yellow-400" : "text-gray-400"
                    } transition-colors duration-300`}
                  />
                  <span className="ml-1 text-sm text-gray-700">Destacado</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
