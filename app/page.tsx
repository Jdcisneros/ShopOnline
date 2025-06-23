import { CategoryButtons } from "@/components/categoryButton";
import HeroCarousel from "@/components/HeroCarousel";
import { KeenSliderWithFavorites } from "@/components/keenSliderFavorites";
import { PaymentMethods } from "@/components/paymentMethod";
import {
  getCategories,
  getFeaturedProducts,
  getSaleProducts,
} from "@/lib/data";

import "keen-slider/keen-slider.min.css";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const saleProducts = await getSaleProducts();
  const categories = await getCategories();

  return (
    <main>
      {/* Hero */}
      <HeroCarousel />

      <CategoryButtons categories={categories} />

      {/* Productos destacados */}
      {featuredProducts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Productos destacados
          </h2>
          <KeenSliderWithFavorites
            products={featuredProducts}
            seeMoreUrl="/products/featured"
            seeMoreText="Ver más destacados"
          />
        </section>
      )}

      {/* Productos en oferta */}
      {saleProducts.length > 0 && (
        <section className="py-12 bg-white">
          <h2 className="text-3xl font-semibold text-center mb-6">En oferta</h2>
          <KeenSliderWithFavorites
            products={saleProducts}
            seeMoreUrl="/products/sale"
            seeMoreText="Ver más en oferta"
          />
        </section>
      )}

      {/* Formas de pago */}
      <PaymentMethods />
    </main>
  );
}
