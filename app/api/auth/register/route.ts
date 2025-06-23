import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "Email ya registrado" }, { status: 400 });
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
    },
  });

  return NextResponse.json({ message: "Usuario creado", userId: user.id });
}
