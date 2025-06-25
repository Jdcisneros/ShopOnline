"use client";

import { ArrowDownNarrowWide, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

type Category = { id: string; name: string };
type Size = { id: string; name: string };
type Color = { id: string; name: string; hex: string };

type Filters = {
  searchText?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy?: "price-asc" | "price-desc" | "name-asc" | "name-desc";
  sizeId?: string;
  colorId?: string;
};

type Props = {
  categories?: Category[];
  sizes?: Size[];
  colors?: Color[];
  filters?: Filters;
  onChange?: (filters: Filters) => void;
};

export default function ProductFilters({
  categories = [],
  sizes = [],
  colors = [],
  filters = {},
  onChange = () => {},
}: Props) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Detectar tamaño pantalla
  useEffect(() => {
    function updateSize() {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
      if (window.innerWidth >= 768) setShowMore(true);
      else setShowMore(false);
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

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
      {/* Siempre mostrar búsqueda */}
      <input
        type="text"
        placeholder="Buscar..."
        value={localFilters.searchText || ""}
        onChange={(e) => updateFilter("searchText", e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-sm min-w-[160px] flex-1"
      />

      {/* Siempre mostrar select orden y botón ver más en móvil */}
      <select
        value={localFilters.sortBy || ""}
        onChange={(e) => {
          const value = e.target.value;
          if (
            value === "price-asc" ||
            value === "price-desc" ||
            value === "name-asc" ||
            value === "name-desc"
          ) {
            updateFilter("sortBy", value);
          } else {
            updateFilter("sortBy", undefined);
          }
        }}
        className="border border-gray-300 rounded px-3 py-2 text-sm min-w-[160px]"
      >
        <option value="">Ordenar por</option>
        <option value="price-asc">Precio: Menor a Mayor</option>
        <option value="price-desc">Precio: Mayor a Menor</option>
        <option value="name-asc">Nombre: A-Z</option>
        <option value="name-desc">Nombre: Z-A</option>
      </select>

      {!isDesktop && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center gap-2 border-1 border-gray-300 rounded px-3 py-2 text-sm  bg-white text-gray-700"
        >
          Filtrar
          <ArrowDownNarrowWide
            className={`w-4 h-4 transition-transform duration-300 ${
              showMore ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      )}
      {/* Filtros adicionales - visibles si desktop o si showMore true */}
      {(isDesktop || showMore) && (
        <>
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

          {/* Talle */}
          {sizes.length > 0 && (
            <select
              value={localFilters.sizeId || ""}
              onChange={(e) =>
                updateFilter("sizeId", e.target.value || undefined)
              }
              className="border border-gray-300 rounded px-3 py-2 text-sm min-w-[160px]"
            >
              <option value="">Todos los talles</option>
              {sizes.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.name}
                </option>
              ))}
            </select>
          )}

          {/* Color */}
          {colors.length > 0 && (
            <select
              value={localFilters.colorId || ""}
              onChange={(e) =>
                updateFilter("colorId", e.target.value || undefined)
              }
              className="border border-gray-300 rounded px-3 py-2 text-sm min-w-[160px]"
            >
              <option value="">Todos los colores</option>
              {colors.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.name}
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

          {/* Limpiar */}
          <button
            onClick={resetFilters}
            title="Limpiar filtros"
            className="ml-auto p-2 text-gray-600 hover:text-red-500 transition"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}
