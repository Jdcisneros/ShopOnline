import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name } = await req.json();

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Nombre inválido" }, { status: 400 });
  }

  try {
    const category = await prisma.category.create({
      data: { name },
    });

    return NextResponse.json(category);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Esta categoría ya existe." },
        { status: 409 }
      );
    }

    console.error("Error al crear categoría:", error);

    return NextResponse.json(
      { error: "Error al crear la categoría." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return NextResponse.json(
      { error: "Error al obtener las categorías" },
      { status: 500 }
    );
  }
}
