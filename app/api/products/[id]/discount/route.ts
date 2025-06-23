import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { RouteContext } from "next"; // 👈 Importás el tipo correcto

export async function PATCH(req: NextRequest, context: RouteContext) {
  const id = context.params.id as string; // forzás el tipo si querés asegurarlo

  try {
    const { discountPercentage } = await req.json();

    if (
      typeof discountPercentage !== "number" ||
      discountPercentage < 0 ||
      discountPercentage > 100
    ) {
      return NextResponse.json(
        { message: "Invalid discount percentage" },
        { status: 400 }
      );
    }

    const updated = await prisma.product.update({
      where: { id },
      data: { discountPercentage },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating discount:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
