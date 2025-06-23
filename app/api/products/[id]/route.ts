/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        variants: true,
      },
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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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
      where: { id: params.id },
      data: { name, description, price, imageUrl, categoryId },
    });

    // Crear talles nuevos
    const createdSizes = [];
    for (const size of newSizes) {
      if (size?.name?.trim()) {
        const newSize = await prisma.size.create({
          data: { name: size.name.trim() },
        });
        createdSizes.push(newSize.id);
      }
    }

    // Crear colores nuevos
    const createdColors = [];
    for (const color of newColors) {
      if (color?.name?.trim() && color?.hex) {
        const newColor = await prisma.color.create({
          data: { name: color.name.trim(), hex: color.hex },
        });
        createdColors.push(newColor.id);
      }
    }

    // Eliminar variantes antiguas
    await prisma.productVariant.deleteMany({
      where: { productId: params.id },
    });

    // Crear variantes con stock
    const variantsData = variants.map((v: any) => ({
      productId: params.id,
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

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const productId = context.params.id;

  try {
    // Eliminar items de órdenes relacionados a este producto
    await prisma.orderItem.deleteMany({
      where: { productId },
    });

    // Eliminar favoritos relacionados a este producto
    await prisma.favorite.deleteMany({
      where: { productId },
    });

    // Eliminar variantes relacionadas
    await prisma.productVariant.deleteMany({
      where: { productId },
    });

    // Finalmente eliminar el producto
    await prisma.product.delete({
      where: { id: productId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return NextResponse.json(
      { error: "Error al eliminar el producto" },
      { status: 500 }
    );
  }
}
