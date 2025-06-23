import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { featured } = await req.json();

    const updated = await prisma.product.update({
      where: { id: params.id },
      data: { featured },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error updating featured", { status: 500 });
  }
}
