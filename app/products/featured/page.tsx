import { prisma } from "@/lib/prisma";
import ProductsClient from "../productsClient";

export default async function FeaturedProductsPage() {
  const products = await prisma.product.findMany({
    where: { featured: true },
    include: { category: true },
  });

  const categories = await prisma.category.findMany();

  return <ProductsClient products={products} categories={categories} />;
}
