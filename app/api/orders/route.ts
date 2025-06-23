/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        items: {
          include: {
            product: {
              select: { name: true, imageUrl: true },
            },
            variant: {
              select: {
                id: true,
                size: { select: { name: true } },
                color: { select: { name: true, hex: true } },
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      orders.map((order) => ({
        id: order.id,
        createdAt: order.createdAt,
        user: { email: order.user?.email || null },
        items: order.items.map((item) => ({
          id: item.productId,
          name: item.product?.name || "Producto eliminado",
          imageUrl: item.product?.imageUrl || null,
          quantity: item.quantity,
          price: item.price,
          variant: item.variant
            ? {
                id: item.variant.id,
                sizeName: item.variant.size?.name || null,
                colorName: item.variant.color?.name || null,
                colorHex: item.variant.color?.hex || null,
              }
            : null,
        })),
      }))
    );
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { items, address, paymentMethod } = await request.json();

    console.log("Items recibidos en POST:", items);
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "No hay items en la orden" },
        { status: 400 }
      );
    }

    if (!address || !paymentMethod) {
      return NextResponse.json(
        { error: "Faltan dirección o método de pago" },
        { status: 400 }
      );
    }

    // Validar que el usuario existe
    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      return NextResponse.json({ error: "Usuario no existe" }, { status: 400 });
    }

    // Validar que cada producto y variante existan
    for (const item of items) {
      const productExists = await prisma.product.findUnique({
        where: { id: item.productId }, // <-- este es el producto real
      });

      if (!productExists) {
        return NextResponse.json(
          { error: `Producto con id ${item.productId} no existe` },
          { status: 400 }
        );
      }

      if (item.variantId) {
        const variantExists = await prisma.productVariant.findUnique({
          where: { id: item.variantId },
        });

        if (!variantExists) {
          return NextResponse.json(
            { error: `Variante con id ${item.variantId} no existe` },
            { status: 400 }
          );
        }
      }
    }

    const total = items.reduce(
      (acc: number, item: { id: string; quantity: number; price: number }) =>
        acc + item.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        address,
        paymentMethod,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creando orden:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
