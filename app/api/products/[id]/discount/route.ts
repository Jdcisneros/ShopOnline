import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { discountPercentage } = await req.json();

    if (
      typeof discountPercentage !== "number" ||
      discountPercentage < 0 ||
      discountPercentage > 100
    ) {
      return new Response(
        JSON.stringify({ message: "Invalid discount percentage" }),
        { status: 400 }
      );
    }

    const updated = await prisma.product.update({
      where: { id },
      data: { discountPercentage },
    });

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    console.error("Error updating discount:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
