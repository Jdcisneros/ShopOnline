/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, context: any) {
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
