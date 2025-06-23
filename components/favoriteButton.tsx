/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { StarIcon, StarOffIcon } from "lucide-react";

export default function FavoriteButton({ productId }: { productId: string }) {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function checkFavorite() {
      if (!session) return;

      const res = await fetch("/api/favorites");
      const favorites = await res.json();
      setIsFavorite(favorites.some((f: any) => f.productId === productId));
    }
    checkFavorite();
  }, [session, productId]);

  async function toggleFavorite() {
    if (!session) {
      alert("Debes iniciar sesión para usar favoritos");
      return;
    }

    if (isFavorite) {
      await fetch(`/api/favorites?productId=${productId}`, {
        method: "DELETE",
      });
      setIsFavorite(false);
    } else {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      setIsFavorite(true);
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      className={`p-1 rounded-full transition-colors duration-200 hover:scale-110 ${
        isFavorite
          ? "text-yellow-400"
          : "text-gray-400 dark:text-gray-300 hover:text-yellow-400"
      }`}
    >
      {isFavorite ? (
        <StarOffIcon className="w-6 h-6" />
      ) : (
        <StarIcon className="w-6 h-6" />
      )}
    </button>
  );
}
