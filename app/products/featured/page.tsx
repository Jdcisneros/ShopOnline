import { prisma } from "@/lib/prisma";
import ProductsClient from "../productsClient";

export default async function FeaturedProductsPage() {
  // Traemos productos con categoría y variantes para calcular stock
  const productsRaw = await prisma.product.findMany({
    where: { featured: true },
    include: {
      category: true,
      variants: true, // traemos las variantes para calcular stock
    },
  });

  // Traemos categorías para filtros o lo que uses
  const categories = await prisma.category.findMany();

  // Calculamos el campo 'inStock' para cada producto
  const products = productsRaw.map((product) => {
    if (!product.category) {
      throw new Error(`Producto ${product.id} sin categoría`);
    }
    return {
      ...product,
      inStock: product.variants.some((v) => v.stock > 0),
      discountPercentage:
        product.discountPercentage === null
          ? undefined
          : product.discountPercentage,
      category: {
        id: product.category.id,
        name: product.category.name,
      },
    };
  });
  return <ProductsClient products={products} categories={categories} />;
}
