import { prisma } from "@/lib/prisma";
import FeaturedProductsClient from "./featuredProducts";

export default async function FeaturedProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return <FeaturedProductsClient products={products} categories={categories} />;
}
