import { prisma } from "@/lib/prisma";
import FeaturedProductsClient from "./featuredProducts";
import { Product, ProductVariant, Category } from "@/types/types";

// Puedes definir un tipo intermedio para cada producto raw
type ProductRaw = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  featured: boolean;
  onSale: boolean;
  discountPercentage?: number | null;
  category: Category | null;
  variants: ProductVariant[];
};

export default async function FeaturedProductsPage() {
  const productsRaw: ProductRaw[] = await prisma.product.findMany({
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
    .filter((p: ProductRaw) => p.categoryId !== null)
    .map((p: ProductRaw) => ({
      id: p.id,
      name: p.name,
      description: p.description ?? "",
      price: p.price,
      imageUrl: p.imageUrl ?? "",
      categoryId: p.categoryId!,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt ?? p.createdAt,
      featured: p.featured,
      onSale: p.onSale,
      discountPercentage: p.discountPercentage ?? undefined,
      category: p.category,
      variants: p.variants,
      inStock: p.variants.some((v: ProductVariant) => v.stock > 0),
    }));

  const categories: Category[] = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return <FeaturedProductsClient products={products} categories={categories} />;
}
