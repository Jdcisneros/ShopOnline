import { Edit2, Trash2 } from "lucide-react";

type Props = {
  productId: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ProductActions({ productId, onEdit, onDelete }: Props) {
  return (
    <div className="flex space-x-3 justify-end">
      <button
        onClick={() => onEdit(productId)}
        aria-label="Editar producto"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-indigo-600 transition"
      >
        <Edit2 size={20} />
        Editar
      </button>

      <button
        onClick={() => onDelete(productId)}
        aria-label="Eliminar producto"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-red-600 transition"
      >
        <Trash2 size={20} />
        Eliminar
      </button>
    </div>
  );
}
