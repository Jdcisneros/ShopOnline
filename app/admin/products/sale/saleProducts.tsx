"use client";

import ProductFilters from "@/components/productFilters";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  onSale: boolean;
  inStock: boolean;
  discountPercentage?: number;
}

interface Filters {
  searchText?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy?: "price-asc" | "price-desc" | "name-asc" | "name-desc";
}

export default function OnSaleProductsClient({
  products: initialProducts,
  categories,
}: {
  products: Product[];
  categories: { id: string; name: string }[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState<Filters>({});
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const [discountLoadingIds, setDiscountLoadingIds] = useState<string[]>([]);

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

    // Orden
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

  async function toggleSale(id: string, current: boolean) {
    setLoadingIds((prev) => [...prev, id]);
    try {
      const res = await fetch(`/api/products/${id}/onsale`, {
        method: "PATCH",
        body: JSON.stringify({ onSale: !current }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to update");

      const updated = await res.json();

      setProducts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, onSale: updated.onSale, discountPercentage: 0 }
            : p
        )
      );
    } catch (error) {
      alert("Error updating sale status");
      console.error(error);
    } finally {
      setLoadingIds((prev) => prev.filter((pid) => pid !== id));
    }
  }

  async function updateDiscount(id: string, discount: number) {
    setDiscountLoadingIds((prev) => [...prev, id]);
    try {
      const res = await fetch(`/api/products/${id}/discount`, {
        method: "PATCH",
        body: JSON.stringify({ discountPercentage: discount }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to update discount");

      const updated = await res.json();

      setProducts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, discountPercentage: updated.discountPercentage }
            : p
        )
      );
      toast.success("Descuento aplicado");
    } catch (error) {
      toast.error("No se pudo aplicar el descuento");
      console.error(error);
    } finally {
      setDiscountLoadingIds((prev) => prev.filter((pid) => pid !== id));
    }
  }

  return (
    <div className="p-6 mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Productos en Oferta
      </h1>
      <ProductFilters
        filters={filters}
        categories={categories}
        onChange={setFilters}
      />
      <div className="overflow-x-auto rounded-xl shadow ring-1 ring-gray-200">
        <table className="w-full text-sm text-gray-700 bg-white">
          <thead className="text-left text-gray-500 uppercase text-xs bg-gray-50">
            <tr>
              <th className="px-4 py-3">Imagen</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">En Oferta</th>
              <th className="px-4 py-3">Descuento %</th>
            </tr>
          </thead>
          <tbody>
            {products.map(
              ({ id, name, price, imageUrl, onSale, discountPercentage }) => (
                <tr key={id} className="hover:bg-gray-50 border-t">
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
                  <td className="px-4 py-3">
                    {onSale && discountPercentage && discountPercentage > 0 ? (
                      <div>
                        <span className="line-through text-gray-500 mr-2">
                          ${price.toFixed(2)}
                        </span>
                        <span className="text-red-600 font-semibold">
                          ${(price * (1 - discountPercentage / 100)).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span>${price.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={onSale}
                        disabled={loadingIds.includes(id)}
                        onChange={() => toggleSale(id, onSale)}
                        className="sr-only peer"
                      />
                      <div
                        className="w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-blue-300
                      peer-checked:bg-blue-600 transition-colors duration-300 ease-in-out"
                      />
                      <div
                        className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow
                      transform transition-transform duration-300 ease-in-out peer-checked:translate-x-5"
                      />
                    </label>
                  </td>
                  <td className="px-4 py-3">
                    {onSale ? (
                      <input
                        type="number"
                        min={0}
                        max={100}
                        step={1}
                        value={discountPercentage || 0}
                        disabled={discountLoadingIds.includes(id)}
                        onChange={(e) => {
                          const val = Math.min(
                            100,
                            Math.max(0, Number(e.target.value))
                          );
                          updateDiscount(id, val);
                        }}
                        className="w-16 px-2 py-1 border rounded text-sm"
                        title="Descuento %"
                      />
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
