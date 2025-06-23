import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import type { RouteContext } from "next";

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const id = context.params.id as string;
    const { onSale } = await req.json();

    const updated = await prisma.product.update({
      where: { id },
      data: { onSale },
    });

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    console.error("Error updating onSale:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
