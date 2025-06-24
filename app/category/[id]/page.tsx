/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import CategoryPageClient from "./categoryPage";

type ProductWithRelations = {
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
  discountPercentage: number | null;
  category: {
    id: string;
    name: string;
    createdAt: Date;
  } | null;
  variants: {
    id: string;
    productId: string;
    sizeId: string;
    colorId: string;
    stock: number;
    size: {
      id: string;
      name: string;
    };
    color: {
      id: string;
      name: string;
      hex: string;
    };
  }[];
};

type CategoryWithProducts = {
  id: string;
  name: string;
  createdAt: Date;
  products: ProductWithRelations[];
};

export default async function CategoryPage({ params }: { params: any }) {
  const categoryRaw = (await prisma.category.findUnique({
    where: { id: params.id },
    include: {
      products: {
        include: {
          variants: {
            include: {
              size: true,
              color: true,
            },
          },
          category: true,
        },
      },
    },
  })) as CategoryWithProducts | null;

  if (!categoryRaw)
    return (
      <div className="text-center py-12 text-neutral-600">
        Categoría no encontrada
      </div>
    );

  // Mapeamos para corregir tipos y evitar null donde no queremos
  const category = {
    ...categoryRaw,
    products: categoryRaw.products.map((product) => ({
      ...product,
      categoryId: product.categoryId ?? "",
      // Cambiamos discountPercentage null a undefined para que encaje con el tipo
      discountPercentage:
        product.discountPercentage === null
          ? undefined
          : product.discountPercentage,
    })),
  };

  return <CategoryPageClient category={category} />;
}
