"use client";

import { useState, useMemo } from "react";
import ProductCard from "../../../components/productCard";
import ProductFilters from "@/components/productFilters";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
};

type Category = {
  id: string;
  name: string;
  products: Product[];
};

type Filters = {
  searchText?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy?: "price-asc" | "price-desc" | "name-asc" | "name-desc";
};

export default function CategoryPageClient({
  category,
}: {
  category: Category;
}) {
  const [filters, setFilters] = useState<Filters>({});

  const filteredProducts = useMemo(() => {
    let filtered = [...category.products];

    if (filters.searchText)
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(filters.searchText!.toLowerCase())
      );

    if (filters.minPrice !== undefined)
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);

    if (filters.maxPrice !== undefined)
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);

    if (filters.inStockOnly) filtered = filtered.filter((p) => p.stock > 0);

    if (filters.sortBy === "price-asc")
      filtered.sort((a, b) => a.price - b.price);
    else if (filters.sortBy === "price-desc")
      filtered.sort((a, b) => b.price - a.price);
    else if (filters.sortBy === "name-asc")
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    else if (filters.sortBy === "name-desc")
      filtered.sort((a, b) => b.name.localeCompare(a.name));

    return filtered;
  }, [category.products, filters]);

  return (
    <main className="px-6 md:px-12 py-14 bg-white min-h-screen">
      <nav className="text-sm text-neutral-500 mb-6">
        <Link href="/" className="hover:underline">
          Inicio
        </Link>{" "}
        /{" "}
        <Link href="/products" className="hover:underline ml-1">
          Productos
        </Link>{" "}
        /{" "}
        <span className="ml-1 text-neutral-700 font-medium">
          {category.name}
        </span>
      </nav>

      <div className="mb-8">
        <ProductFilters
          categories={[{ id: category.id, name: category.name }]}
          filters={filters}
          onChange={setFilters}
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
