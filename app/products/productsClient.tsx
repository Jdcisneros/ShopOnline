"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/productCard";
import ProductFilters from "@/components/productFilters";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
  category: { id: string; name: string };
}

interface Filters {
  searchText?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy?: "price-asc" | "price-desc" | "name-asc" | "name-desc";
}

interface Favorite {
  id: string;
  userId: string;
  productId: string;
  product: Product;
}

export default function ProductsClient({
  products: initialProducts,
  categories,
}: {
  products: Product[];
  categories: { id: string; name: string }[];
}) {
  const [filters, setFilters] = useState<Filters>({});
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>([]);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const res = await fetch("/api/favorites");
        if (!res.ok) throw new Error("No autorizado o error");
        const data: Favorite[] = await res.json();
        setFavoriteProductIds(data.map((fav) => fav.product.id));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }
    fetchFavorites();
  }, []);

  useEffect(() => {
    let filtered = [...initialProducts];

    if (filters.categoryId && filters.categoryId.trim() !== "") {
      filtered = filtered.filter((p) => p.category.id === filters.categoryId);
    }
    if (filters.searchText && filters.searchText.trim() !== "") {
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
      if (filters.sortBy === "price-asc") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (filters.sortBy === "name-asc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filters.sortBy === "name-desc") {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
      }
    }

    setProducts(filtered);
  }, [filters, initialProducts]);

  async function addFavorite(productId: string) {
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (res.status === 401) {
        return false;
      }
      if (!res.ok) throw new Error("No se pudo agregar favorito");
      setFavoriteProductIds((prev) => [...prev, productId]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function removeFavorite(productId: string) {
    try {
      const res = await fetch(`/api/favorites?productId=${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("No se pudo eliminar favorito");
      setFavoriteProductIds((prev) => prev.filter((id) => id !== productId));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  return (
    <main className="px-6 md:px-12 py-14 bg-white min-h-screen">
      {/* Encabezado */}
      <nav className="text-sm text-neutral-500 mb-6">
        <Link href="/" className="hover:underline">
          Inicio
        </Link>{" "}
        /{" "}
        <Link href="/products" className="text-neutral-700 font-semibold">
          Productos
        </Link>
      </nav>

      {/* Filtros */}
      <div className="mb-10">
        <ProductFilters
          filters={filters}
          onChange={setFilters}
          categories={categories}
        />
      </div>

      {/* Grilla de productos */}
      {products.length > 0 ? (
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favoriteProductIds.includes(product.id)}
              onAddFavorite={() => addFavorite(product.id)}
              onRemoveFavorite={() => removeFavorite(product.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg mt-20">
          No se encontraron productos con esos filtros.
        </div>
      )}
    </main>
  );
}
