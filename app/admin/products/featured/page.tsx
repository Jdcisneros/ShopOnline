import { prisma } from "@/lib/prisma";
import FeaturedProductsClient from "./featuredProducts";
import { Product } from "@/types/types";

export default async function FeaturedProductsPage() {
  const productsRaw = await prisma.product.findMany({
    include: {
      category: true,
      variants: {
        include: {
          color: true,
          size: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const products: Product[] = productsRaw
    .filter((p) => p.categoryId !== null)
    .map(
      (p): Product => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        imageUrl: p.imageUrl, // aquí garantizamos string no-null
        categoryId: p.categoryId!,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt!, // asumiendo que updatedAt no es null, forzamos con '!'
        featured: p.featured,
        onSale: p.onSale,
        discountPercentage: p.discountPercentage ?? undefined,
        category: p.category,
        variants: p.variants,
        inStock: p.variants.some((v) => v.stock > 0),
      })
    );
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return <FeaturedProductsClient products={products} categories={categories} />;
}
