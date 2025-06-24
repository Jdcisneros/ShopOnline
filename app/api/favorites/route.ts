import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const email = session.user.email;
  if (!email) {
    return NextResponse.json(
      { error: "Email no disponible en la sesión" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(favorites);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const email = session.user.email;
  if (!email) {
    return NextResponse.json(
      { error: "Email no disponible en la sesión" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { productId } = await req.json();

  const existing = await prisma.favorite.findFirst({
    where: { userId: user.id, productId },
  });

  if (existing) {
    return NextResponse.json(
      { message: "Ya está en favoritos" },
      { status: 400 }
    );
  }

  const favorite = await prisma.favorite.create({
    data: { userId: user.id, productId },
  });

  return NextResponse.json(favorite);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const email = session.user.email;
  if (!email) {
    return NextResponse.json(
      { error: "Email no disponible en la sesión" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");
  if (!productId)
    return NextResponse.json({ error: "Falta productId" }, { status: 400 });

  await prisma.favorite.deleteMany({
    where: { userId: user.id, productId },
  });

  return NextResponse.json({ message: "Eliminado de favoritos" });
}
