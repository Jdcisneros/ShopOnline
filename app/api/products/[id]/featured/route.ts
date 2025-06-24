/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest, context: any) {
  try {
    const id = context.params.id as string;
    const { featured } = await req.json();

    const updated = await prisma.product.update({
      where: { id },
      data: { featured },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating featured:", error);
    return NextResponse.json(
      { error: "Error updating featured" },
      { status: 500 }
    );
  }
}
