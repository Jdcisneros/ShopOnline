"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "@/components/productCard"; // el mismo que usás en todos lados

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

type Favorite = {
  id: string;
  product: Product;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/favorites")
      .then((res) => {
        if (!res.ok) throw new Error("Error en la API favoritos");
        return res.json();
      })
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleRemoveFavorite = async (productId: string) => {
    try {
      const res = await fetch(`/api/favorites?productId=${productId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFavorites((prev) => prev.filter((f) => f.product.id !== productId));
        toast.success("Producto eliminado de guardados");
      } else {
        toast.error("No se pudo eliminar");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar");
    }
  };

  if (loading)
    return (
      <div className="text-center text-neutral-500 py-20 text-lg">
        Cargando favoritos...
      </div>
    );

  if (favorites.length === 0)
    return (
      <div className="text-center text-neutral-500 text-lg py-20">
        No tienes productos guardados.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-8 text-neutral-800 tracking-tight">
        Tus guardados
      </h1>

      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {favorites.map((fav) => (
          <ProductCard
            key={fav.product.id}
            product={fav.product}
            isFavorite={true}
            onRemoveFavorite={() => handleRemoveFavorite(fav.product.id)}
          />
        ))}
      </div>
    </div>
  );
}
