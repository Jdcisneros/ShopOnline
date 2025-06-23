import { prisma } from "@/lib/prisma"; // ajustá si tu cliente Prisma está en otro path

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true, // para incluir el nombre de la categoría
        variants: {
          include: {
            size: true,
            color: true,
          },
        },
      },
    });

    return product;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return null;
  }
}

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getFeaturedProducts() {
  return await prisma.product.findMany({
    where: {
      featured: true,
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Obtener productos en oferta
export async function getSaleProducts() {
  return await prisma.product.findMany({
    where: {
      onSale: true,
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });
}
