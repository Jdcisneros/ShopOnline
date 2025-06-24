/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, context: any) {
  const id = context.params.id;
  const { name } = await req.json();

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Nombre inválido" }, { status: 400 });
  }

  try {
    const category = await prisma.category.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, context: any) {
  const id = context.params.id;

  try {
    await prisma.category.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Categoría eliminada" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}