import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Obtener productos con filtros
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || undefined;
    const categoryId = searchParams.get("category") || undefined;
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const inStockOnly = searchParams.get("inStockOnly") === "true";
    const sortBy = searchParams.get("sortBy") || undefined;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (minPrice) {
      where.price = { ...where.price, gte: Number(minPrice) };
    }

    if (maxPrice) {
      where.price = { ...where.price, lte: Number(maxPrice) };
    }

    if (inStockOnly) {
      where.variants = {
        some: {
          stock: { gt: 0 },
        },
      };
    }

    const orderBy =
      sortBy === "price-asc"
        ? { price: "asc" }
        : sortBy === "price-desc"
        ? { price: "desc" }
        : sortBy === "name-asc"
        ? { name: "asc" }
        : sortBy === "name-desc"
        ? { name: "desc" }
        : { createdAt: "desc" };

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        variants: {
          include: {
            size: true,
            color: true,
          },
        }, // importante si querés incluir talles y colores al consultar
      },
      orderBy,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { message: "Error al obtener productos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      description,
      price,
      imageUrl,
      categoryId,
      sizesIds = [],
      colorsIds = [],
      newSizes = [],
      newColors = [],
      variants = [],
    } = await req.json();

    if (!name || !description || price == null || !imageUrl || !categoryId) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        imageUrl,
        categoryId,
      },
    });

    // Crear talles nuevos
    const createdSizes = [];
    for (const sizeName of newSizes.map((s) => s.name.trim()).filter(Boolean)) {
      const size = await prisma.size.create({ data: { name: sizeName } });
      createdSizes.push(size.id);
    }
    const finalSizesIds = [
      ...sizesIds.filter((id) => id !== "custom"),
      ...createdSizes,
    ];

    // Crear colores nuevos
    const createdColors = [];
    for (const colorData of newColors.filter((c) => c.name.trim() && c.hex)) {
      const color = await prisma.color.create({
        data: { name: colorData.name.trim(), hex: colorData.hex },
      });
      createdColors.push(color.id);
    }
    const finalColorsIds = [
      ...colorsIds.filter((id) => id !== "custom"),
      ...createdColors,
    ];

    // Crear variantes con stock
    const variantsData = variants.map((v: any) => ({
      productId: product.id,
      sizeId: v.sizeId,
      colorId: v.colorId,
      stock: Number(v.stock) || 0,
    }));

    await prisma.productVariant.createMany({ data: variantsData });

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error("POST /api/products error:", err);
    return NextResponse.json(
      { error: "Error al crear producto" },
      { status: 500 }
    );
  }
}
