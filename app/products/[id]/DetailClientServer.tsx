/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Bookmark } from "lucide-react";
import AddToCartSection from "@/components/addToCartSelection";
import ShippingCalculatorButton from "@/components/shippingCalculator";
import toast from "react-hot-toast";
import Link from "next/link";
import { useState, useEffect } from "react";

type Color = {
  id: string;
  name: string;
  hex: string;
};

type Size = {
  id: string;
  name: string;
};

type Variant = {
  id: string;
  size: Size;
  color: Color;
  stock: number;
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  variants: Variant[];
};

export default function ProductClientDetail({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColorId, setSelectedColorId] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);

  const sizes = Array.from(
    new Set(
      Array.isArray(product.variants)
        ? product.variants.map((v: any) => v.size.name)
        : []
    )
  );

  const colors = Array.isArray(product.variants)
    ? Array.from(
        new Map(
          product.variants.map((v: any) => [v.color.id, v.color])
        ).values()
      )
    : [];

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await fetch("/api/favorites");
        if (!res.ok) throw new Error("Error fetching favorites");
        const data = await res.json();
        const exists = Array.isArray(data)
          ? data.find((f: any) => f.product?.id === product.id)
          : undefined;
        setIsFavorite(!!exists);
      } catch (err) {
        console.error("Error checking favorite", err);
        setIsFavorite(false);
      }
    };
    checkFavorite();
  }, [product.id]);

  useEffect(() => {
    if (!selectedSize || !selectedColorId) {
      setSelectedVariant(null);
      return;
    }
    const variant = (product.variants || []).find(
      (v: any) => v.size.name === selectedSize && v.color.id === selectedColorId
    );
    setSelectedVariant(variant || null);
  }, [selectedSize, selectedColorId, product.variants]);

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        await fetch(`/api/favorites?productId=${product.id}`, {
          method: "DELETE",
        });
        toast("Producto eliminado de guardados");
        setIsFavorite(false);
      } else {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product.id }),
        });
        toast.success("Producto guardado");
        setIsFavorite(true);
      }
    } catch (error) {
      toast.error("Error al actualizar favorito");
    }
  };

  return (
    <main className=" mx-auto px-10 py-12 mt-10">
      {/* Breadcrumbs */}
      <nav className="text-sm text-neutral-500 mb-8">
        <Link href="/" className="hover:underline">
          Inicio
        </Link>{" "}
        /{" "}
        <Link href="/products" className="hover:underline">
          Productos
        </Link>{" "}
        / <span className="text-neutral-700 font-semibold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Imagen y favoritos */}
        <div className="relative rounded-2xl overflow-hidden border bg-white shadow-sm aspect-square">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          <button
            onClick={handleFavorite}
            aria-label={isFavorite ? "Quitar de guardados" : "Guardar producto"}
            type="button"
            className="absolute top-2 right-2 p-2 rounded-full text-gray-600 hover:text-gray-800 transition-transform"
          >
            <Bookmark
              size={24}
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={2}
            />
          </button>
        </div>

        {/* Detalle del producto */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-neutral-900">
            {product.name}
          </h1>
          <p className="text-base text-neutral-600">{product.description}</p>
          <div className="text-3xl font-semibold text-neutral-900">
            ${product.price.toFixed(2)}
          </div>

          {/* Selectores */}
          <div className="space-y-4">
            {/* Talles */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Talle:
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-1 rounded-full border text-sm font-medium transition ${
                        isSelected
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colores */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Color:
              </label>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => {
                  const isSelected = selectedColorId === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColorId(color.id)}
                      className={`w-8 h-8 rounded-full border transition ${
                        isSelected ? "ring-2 ring-black" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Stock */}
          {selectedVariant ? (
            selectedVariant.stock > 0 ? (
              <span className="text-green-600 font-medium text-sm">
                Stock disponible
              </span>
            ) : (
              <span className="text-red-600 font-medium text-sm">
                Sin stock para esta combinación
              </span>
            )
          ) : (
            <span className="text-gray-500 text-sm">
              Seleccioná talle y color
            </span>
          )}

          <ShippingCalculatorButton />

          <AddToCartSection
            product={product}
            selectedVariant={selectedVariant || { stock: 0 }}
            disabled={!selectedVariant || selectedVariant.stock === 0}
          />

          {(!selectedVariant || selectedVariant.stock === 0) && (
            <div className="text-sm text-gray-400 mt-4">
              {selectedSize && selectedColorId
                ? "No hay stock para esta combinación"
                : ""}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
