/* eslint-disable @typescript-eslint/no-unused-vars */

import Link from "next/link";
import { Bookmark } from "lucide-react";
import toast from "react-hot-toast";
import React from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  onSale?: boolean;
  discountPercentage?: number | null;
}

function formatPriceARS(price: number) {
  const formatted = price.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatted.replace(",00", "");
}

export default function ProductCard({
  product,
  isFavorite = false,
  onAddFavorite,
  onRemoveFavorite,
}: {
  product: Product;
  isFavorite?: boolean;
  onAddFavorite?: () => void;
  onRemoveFavorite?: () => void;
}) {
  const { price, discountPercentage, onSale } = product;

  const discountedPrice =
    onSale && discountPercentage && discountPercentage > 0
      ? price * (1 - discountPercentage / 100)
      : null;

  const [isClicked, setIsClicked] = React.useState(false);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsClicked(true);

    try {
      let success = false;

      if (isFavorite) {
        success = (await onRemoveFavorite?.()) ?? false;
        if (success) {
          toast("Producto removido de guardados");
        }
      } else {
        success = (await onAddFavorite?.()) ?? false;
        if (success) {
          toast.success("Producto guardado");
        }
      }

      if (!success) {
        toast.error("Iniciá sesión para guardar productos favoritos");
      }
    } catch (error) {
      toast.error("Ocurrió un error al guardar el favorito");
    }

    setTimeout(() => {
      setIsClicked(false);
    }, 150);
  };
  return (
    <div className="block group text-center relative">
      <Link href={`/products/${product.id}`}>
        <div className="w-full aspect-square overflow-hidden rounded-lg bg-white border border-gray-300 shadow-sm group-hover:shadow-md transition duration-300 relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={250}
            height={250}
            className="object-cover group-hover:scale-105 transition-transform"
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </Link>

      <button
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? "Quitar de guardados" : "Guardar producto"}
        type="button"
        className="absolute top-2 right-2 p-2 rounded-full text-gray-600 hover:text-gray-800 transition-transform"
        style={{
          transform: isClicked ? "scale(1.3)" : "scale(1)",
          transition: "transform 150ms ease-in-out",
        }}
      >
        <Bookmark
          size={24}
          fill={isFavorite ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={2}
        />
      </button>

      <div className="mt-3">
        <h3 className="text-base font-semibold text-gray-600 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-700 mt-1">
          {discountedPrice ? (
            <>
              <span className="line-through text-gray-400 mr-2">
                {formatPriceARS(price)}
              </span>
              <span className="text-red-600 font-semibold">
                {formatPriceARS(discountedPrice)}
              </span>
            </>
          ) : (
            formatPriceARS(price)
          )}
        </p>
      </div>
    </div>
  );
}
