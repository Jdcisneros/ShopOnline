"use client";

import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface Variant {
  id: string;
  size: { name: string };
  color: { name: string };
  stock: number;
}

interface AddToCartButtonProps {
  product: Product;
  quantity: number;
  selectedVariant: Variant | null;
  disabled: boolean;
}

export default function AddToCartButton({
  product,
  quantity,
  selectedVariant,
  disabled,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleClick = () => {
    if (!selectedVariant) {
      toast.error("Debés seleccionar talle y color");
      return;
    }

    addItem({
      id: selectedVariant.id,
      variantId: selectedVariant.id, 
      productId: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity,
      size: selectedVariant.size.name,
      color: selectedVariant.color.name,
      stock: selectedVariant.stock,
    });

    toast.success(`${product.name} x${quantity} agregado al carrito`);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`w-full text-sm font-medium py-3 px-6 rounded-xl transition-all duration-200
    ${
      disabled
        ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
        : "bg-black text-white hover:bg-neutral-800 active:scale-[0.98]"
    }
  `}
    >
      Agregar al carrito
    </button>
  );
}
