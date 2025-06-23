import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

export async function DELETE(req: Request, { params }: Params) {
  try {
    await prisma.category.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Categoría eliminada" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  const { name } = await req.json();

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Nombre inválido" }, { status: 400 });
  }

  try {
    const category = await prisma.category.update({
      where: { id: params.id },
      data: { name },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}
