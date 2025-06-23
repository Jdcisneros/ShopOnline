import { prisma } from "@/lib/prisma";
import OnSaleProductsClient from "./saleProducts";
import { Product } from "@/types/types";

export default async function SaleProductsPage() {
  const [productsRaw, categories] = await Promise.all([
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        variants: { include: { color: true, size: true } },
        category: true,
      },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const products: Product[] = productsRaw
    .filter((p) => p.categoryId !== null)
    .map((p) => ({
      ...p,
      categoryId: p.categoryId!,
      inStock: p.variants.some((v) => v.stock > 0),
      discountPercentage: p.discountPercentage ?? undefined,
    }));

  return <OnSaleProductsClient products={products} categories={categories} />;
}
