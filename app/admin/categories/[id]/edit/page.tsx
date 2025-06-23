import { prisma } from "@/lib/prisma";
import EditCategoryForm from "./form";

type Props = {
  params: { id: string };
};

export default async function EditCategoryPage({ params }: Props) {
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
