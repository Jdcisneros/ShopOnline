/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { KeenSlider } from "./KeenSlider";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  onSale?: boolean;
  discountPercentage?: number | null;
}

export function KeenSliderWithFavorites({
  products,
  seeMoreUrl,
  seeMoreText,
}: {
  products: Product[];
  seeMoreUrl?: string;
  seeMoreText?: string;
}) {
  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>([]);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const res = await fetch("/api/favorites");
        if (res.status === 401) {
          setFavoriteProductIds([]);
          return;
        }
        if (!res.ok) throw new Error("Error al obtener favoritos");
        const data = await res.json();
        setFavoriteProductIds(data.map((fav: any) => fav.product.id));
      } catch (error) {
        console.error("Error cargando favoritos:", error);
        setFavoriteProductIds([]);
      }
    }
    fetchFavorites();
  }, []);

  const addFavorite = async (productId: string) => {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    if (res.status === 401) {
      return false; // No autorizado
    }

    if (!res.ok) throw new Error("Error al guardar");

    setFavoriteProductIds((prev) => [...prev, productId]);
    return true;
  };

  const removeFavorite = async (productId: string) => {
    const res = await fetch(`/api/favorites?productId=${productId}`, {
      method: "DELETE",
    });

    if (res.status === 401) {
      return false;
    }

    if (!res.ok) throw new Error("Error al eliminar");

    setFavoriteProductIds((prev) => prev.filter((id) => id !== productId));
    return true;
  };

  return (
    <KeenSlider
      products={products}
      seeMoreUrl={seeMoreUrl}
      seeMoreText={seeMoreText}
      favoriteProductIds={favoriteProductIds}
      onAddFavorite={addFavorite}
      onRemoveFavorite={removeFavorite}
    />
  );
}
