import { prisma } from "@/lib/prisma";
import ProductsClient from "./productsClient";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
  category: { id: string; name: string };
}

export default async function ProductsPage() {
  const productsRaw = await prisma.product.findMany({
    include: {
      category: true,
      variants: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const products: Product[] = productsRaw.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    imageUrl: p.imageUrl,
    inStock: p.variants.some((variant: { stock: number }) => variant.stock > 0),
    category: p.category
      ? { id: p.category.id, name: p.category.name }
      : { id: "", name: "" },
  }));

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return <ProductsClient products={products} categories={categories} />;
}
