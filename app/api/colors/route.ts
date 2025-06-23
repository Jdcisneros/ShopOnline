import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const colors = await prisma.color.findMany();
    return NextResponse.json(colors);
  } catch (error) {
    console.error("Error al obtener colores:", error);
    return NextResponse.json(
      { error: "Error al obtener colores" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, hex } = await req.json();

    if (
      !name ||
      typeof name !== "string" ||
      name.trim().length === 0 ||
      !hex ||
      typeof hex !== "string" ||
      !/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)
    ) {
      return NextResponse.json({ message: "Datos inválidos" }, { status: 400 });
    }

    const existing = await prisma.color.findFirst({
      where: {
        name: { equals: name.trim(), mode: "insensitive" },
      },
    });

    if (existing) {
      return NextResponse.json({ message: "Color ya existe" }, { status: 409 });
    }

    const newColor = await prisma.color.create({
      data: { name: name.trim(), hex: hex.toLowerCase() },
    });

    return NextResponse.json(newColor, { status: 201 });
  } catch (error) {
    console.error("Error al crear color:", error);
    return NextResponse.json(
      { error: "Error al crear color" },
      { status: 500 }
    );
  }
}
