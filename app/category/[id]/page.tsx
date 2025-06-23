/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import CategoryPageClient from "./categoryPage";

export default async function CategoryPage({ params }: any) {
  const category = await prisma.category.findUnique({
    where: { id: params.id },
    include: { products: true },
  });

  if (!category)
    return (
      <div className="text-center py-12 text-neutral-600">
        Categoría no encontrada
      </div>
    );

  return <CategoryPageClient category={category} />;
}
