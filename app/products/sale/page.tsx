import { prisma } from "@/lib/prisma";
import ProductsClient from "../productsClient";

export default async function SaleProductsPage() {
  const products = await prisma.product.findMany({
    where: { onSale: true },
    include: { category: true },
  });

  const categories = await prisma.category.findMany();

  return <ProductsClient products={products} categories={categories} />;
}
