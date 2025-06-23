import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();

  if (body.name && body.email) {
    // Actualizar nombre y email
    try {
      const updatedUser = await prisma.user.update({
        where: { id: session.user.id },
        data: {
          name: body.name,
          email: body.email,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return NextResponse.json({ user: updatedUser });
    } catch {
      return NextResponse.json(
        { error: "Error al actualizar datos" },
        { status: 500 }
      );
    }
  } else if (body.currentPassword && body.newPassword) {
    // Actualizar contraseña
    const bcrypt = await import("bcryptjs");
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    if (!user)
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );

    const isValid = await bcrypt.compare(body.currentPassword, user.password);
    if (!isValid)
      return NextResponse.json(
        { error: "Contraseña actual incorrecta" },
        { status: 400 }
      );

    const hashedNewPassword = await bcrypt.hash(body.newPassword, 10);

    try {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { password: hashedNewPassword },
      });

      return NextResponse.json({
        message: "Contraseña actualizada correctamente",
      });
    } catch {
      return NextResponse.json(
        { error: "Error al actualizar contraseña" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
}
