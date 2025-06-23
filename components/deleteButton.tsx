"use client";

type Props = {
  categoryId: string;
};

export function DeleteButton({ categoryId }: Props) {
  const handleDelete = async () => {
    const confirmDelete = confirm("¿Eliminar esta categoría?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/categories/${categoryId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Error al eliminar la categoría");
    } else {
      location.reload(); // o usa router.refresh() si usás `useRouter`
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
    >
      Eliminar
    </button>
  );
}
