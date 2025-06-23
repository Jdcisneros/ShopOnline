import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sizes = await prisma.size.findMany();
    return NextResponse.json(sizes);
  } catch (error) {
    console.error("Error al obtener talles:", error);
    return NextResponse.json(
      { error: "Error al obtener talles" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { message: "Nombre de talle inválido" },
        { status: 400 }
      );
    }

    const existing = await prisma.size.findFirst({
      where: {
        name: { equals: name.trim(), mode: "insensitive" },
      },
    });

    if (existing) {
      return NextResponse.json({ message: "Talle ya existe" }, { status: 409 });
    }

    const newSize = await prisma.size.create({
      data: { name: name.trim() },
    });

    return NextResponse.json(newSize, { status: 201 });
  } catch (error) {
    console.error("Error al crear talle:", error);
    return NextResponse.json(
      { error: "Error al crear talle" },
      { status: 500 }
    );
  }
}
