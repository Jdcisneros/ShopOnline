"use client"

import { SeeMoreCard } from "./SeeMoreCard";
import ProductCard from "./productCard";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  onSale?: boolean;
  discountPercentage?: number | null;
}

export function KeenSlider({
  products,
  seeMoreUrl,
  seeMoreText,
  favoriteProductIds = [],
  onAddFavorite,
  onRemoveFavorite,
}: {
  products: Product[];
  seeMoreUrl?: string;
  seeMoreText?: string;
  favoriteProductIds?: string[];
  onAddFavorite?: (productId: string) => void;
  onRemoveFavorite?: (productId: string) => void;
}) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    slides: {
      perView: 2,
      spacing: 12,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 3, spacing: 16 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 20 },
      },
    },
  });

  return (
    <div className="relative my-8">
      <div ref={sliderRef} className="keen-slider px-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="keen-slider__slide flex justify-center"
          >
            <ProductCard
              product={product}
              isFavorite={favoriteProductIds.includes(product.id)}
              onAddFavorite={() => onAddFavorite?.(product.id)}
              onRemoveFavorite={() => onRemoveFavorite?.(product.id)}
            />
          </div>
        ))}

        {seeMoreUrl && seeMoreText && (
          <div className="keen-slider__slide">
            <SeeMoreCard href={seeMoreUrl} text={seeMoreText} />
          </div>
        )}
      </div>
    </div>
  );
}
