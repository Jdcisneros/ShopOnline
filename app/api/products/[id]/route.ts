import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import type { RouteContext } from "next";
interface VariantInput {
  sizeId: string;
  colorId: string;
  stock: number;
}

// GET
export async function GET(_req: NextRequest, context: RouteContext) {
  const id = context.params.id as string;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { variants: true },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return NextResponse.json(
      { error: "Error al obtener producto" },
      { status: 500 }
    );
  }
}

// PUT
export async function PUT(req: NextRequest, context: RouteContext) {
  const id = context.params.id as string;
  const {
    name,
    description,
    price,
    imageUrl,
    categoryId,
    newSizes = [],
    newColors = [],
    variants = [],
  } = await req.json();

  if (!name || name.length < 3) {
    return NextResponse.json({ error: "Nombre inválido" }, { status: 400 });
  }
  if (price <= 0) {
    return NextResponse.json({ error: "Precio inválido" }, { status: 400 });
  }

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, description, price, imageUrl, categoryId },
    });

    const createdSizes: string[] = [];
    for (const size of newSizes) {
      if (size?.name?.trim()) {
        const newSize = await prisma.size.create({
          data: { name: size.name.trim() },
        });
        createdSizes.push(newSize.id);
      }
    }

    const createdColors: string[] = [];
    for (const color of newColors) {
      if (color?.name?.trim() && color?.hex) {
        const newColor = await prisma.color.create({
          data: { name: color.name.trim(), hex: color.hex },
        });
        createdColors.push(newColor.id);
      }
    }

    await prisma.productVariant.deleteMany({ where: { productId: id } });

    const variantsData = (variants as VariantInput[]).map((v) => ({
      productId: id,
      sizeId: v.sizeId,
      colorId: v.colorId,
      stock: v.stock,
    }));

    await prisma.productVariant.createMany({ data: variantsData });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return NextResponse.json(
      { error: "Error actualizando producto" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(_req: NextRequest, context: RouteContext) {
  const id = context.params.id as string;

  try {
    await prisma.orderItem.deleteMany({ where: { productId: id } });
    await prisma.favorite.deleteMany({ where: { productId: id } });
    await prisma.productVariant.deleteMany({ where: { productId: id } });
    await prisma.product.delete({ where: { id } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return NextResponse.json(
      { error: "Error al eliminar el producto" },
      { status: 500 }
    );
  }
}
