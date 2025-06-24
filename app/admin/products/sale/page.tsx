import { prisma } from "@/lib/prisma";
import OnSaleProductsClient from "./saleProducts";
import { Product, ProductVariant, Category } from "@/types/types";

// Define un tipo para los productos raw según lo que devuelve Prisma:
type ProductRaw = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  onSale: boolean;
  discountPercentage?: number | null;
  category: Category | null;
  variants: ProductVariant[];
};

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

  // Añade el tipo ProductRaw explícito en el parámetro p:
  const products: Product[] = (productsRaw as ProductRaw[])
    .filter((p: ProductRaw) => p.categoryId !== null)
    .map((p: ProductRaw) => ({
      ...p,
      categoryId: p.categoryId!,
      description: p.description ?? "",
      imageUrl: p.imageUrl ?? "",
      updatedAt: p.updatedAt ?? new Date(),
      inStock: p.variants.some((v: ProductVariant) => v.stock > 0),
      discountPercentage: p.discountPercentage ?? undefined,
    }));

  return <OnSaleProductsClient products={products} categories={categories} />;
}
