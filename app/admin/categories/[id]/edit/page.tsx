import { prisma } from "@/lib/prisma";
import EditCategoryForm from "./form";

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const category = await prisma.category.findUnique({
    where: { id: params.id },
  });

  if (!category) {
    return <p>Categoría no encontrada</p>;
  }

  return (
    <EditCategoryForm category={{ id: category.id, name: category.name }} />
  );
}
