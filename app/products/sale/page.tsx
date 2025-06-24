import { prisma } from "@/lib/prisma";
import ProductsClient from "../productsClient";

export default async function SaleProductsPage() {
  const productsRaw = await prisma.product.findMany({
    where: { onSale: true },
    include: {
      category: true,
      variants: true,
    },
  });

  // Mapear para agregar inStock y normalizar categoría
  const products = productsRaw.map((p) => ({
    ...p,
    inStock: p.variants.some((variant) => variant.stock > 0),
    category: p.category
      ? { id: p.category.id, name: p.category.name }
      : { id: "", name: "" },
  }));

  const categories = await prisma.category.findMany();

  return <ProductsClient products={products} categories={categories} />;
}
