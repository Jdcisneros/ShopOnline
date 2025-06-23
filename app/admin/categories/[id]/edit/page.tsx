/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import EditCategoryForm from "./form";


export default async function EditCategoryPage({ params }: any) {
  const category = await prisma.category.findUnique({
    where: { id: params.id },
  });

  if (!category) {
    return <p className="text-red-500">Categoría no encontrada</p>;
  }

  return (
    <EditCategoryForm category={{ id: category.id, name: category.name }} />
  );
}
