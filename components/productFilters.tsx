"use client";

import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

type Category = { id: string; name: string };

type Filters = {
  searchText?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy?: "price-asc" | "price-desc" | "name-asc" | "name-desc";
};

type Props = {
  categories?: Category[];
  filters?: Filters;
  onChange?: (filters: Filters) => void;
};

export default function ProductFilters({
  categories = [],
  filters = {},
  onChange = () => {},
}: Props) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onChange(newFilters);
  };

  const resetFilters = () => {
    const cleared: Filters = {};
    setLocalFilters(cleared);
    onChange(cleared);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow mb-6 flex flex-wrap gap-4 items-center">
      {/* Búsqueda */}
      <input
        type="text"
        placeholder="Buscar..."
        value={localFilters.searchText || ""}
        onChange={(e) => updateFilter("searchText", e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-sm min-w-[160px] flex-1"
      />

      {/* Categoría */}
      {categories.length > 1 && (
        <select
          value={localFilters.categoryId || ""}
          onChange={(e) =>
            updateFilter("categoryId", e.target.value || undefined)
          }
          className="border border-gray-300 rounded px-3 py-2 text-sm min-w-[160px]"
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      )}

      {/* Precio mínimo */}
      <input
        type="number"
        placeholder="Precio mín"
        min={0}
        value={localFilters.minPrice ?? ""}
        onChange={(e) =>
          updateFilter(
            "minPrice",
            e.target.value ? Number(e.target.value) : undefined
          )
        }
        className="border border-gray-300 rounded px-3 py-2 text-sm w-28"
      />

      {/* Precio máximo */}
      <input
        type="number"
        placeholder="Precio máx"
        min={0}
        value={localFilters.maxPrice ?? ""}
        onChange={(e) =>
          updateFilter(
            "maxPrice",
            e.target.value ? Number(e.target.value) : undefined
          )
        }
        className="border border-gray-300 rounded px-3 py-2 text-sm w-28"
      />

      {/* Stock */}
      <label className="flex items-center text-sm text-gray-700 space-x-2">
        <input
          type="checkbox"
          checked={localFilters.inStockOnly || false}
          onChange={(e) => updateFilter("inStockOnly", e.target.checked)}
        />
        <span>Solo stock</span>
      </label>

      {/* Ordenamiento */}
      <select
        value={localFilters.sortBy || ""}
        onChange={(e) => updateFilter("sortBy", e.target.value || undefined)}
        className="border border-gray-300 rounded px-3 py-2 text-sm min-w-[160px]"
      >
        <option value="">Ordenar por</option>
        <option value="price-asc">Precio: Menor a Mayor</option>
        <option value="price-desc">Precio: Mayor a Menor</option>
        <option value="name-asc">Nombre: A-Z</option>
        <option value="name-desc">Nombre: Z-A</option>
      </select>

      {/* Limpiar */}
      <button
        onClick={resetFilters}
        title="Limpiar filtros"
        className="ml-auto p-2 text-gray-600 hover:text-red-500 transition"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
