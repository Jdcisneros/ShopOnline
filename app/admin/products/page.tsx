/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import ProductActions from "@/components/productActions";
import ProductModal from "./new/page";
import toast from "react-hot-toast";
import ProductFilters from "@/components/productFilters";
import { Tag } from "lucide-react";

type Variant = {
  id: string;
  productId: string;
  sizeId: string;
  colorId: string;
  stock: number;
  size: { id: string; name: string };
  color: { id: string; name: string; hex: string };
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: string;
  category?: { name: string };
  variants?: Variant[];
};

type Filters = {
  searchText?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy?: "price-asc" | "price-desc" | "name-asc" | "name-desc";
};

type Category = { id: string; name: string };

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // Estado para guardar el id del producto que queremos eliminar y mostrar modal
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const fetchProducts = async (filters: Filters) => {
    setLoading(true);
    try {
      const query = new URLSearchParams();

      if (filters.searchText) query.set("search", filters.searchText);
      if (filters.categoryId) query.set("category", filters.categoryId);
      if (filters.minPrice !== undefined)
        query.set("minPrice", String(filters.minPrice));
      if (filters.maxPrice !== undefined)
        query.set("maxPrice", String(filters.maxPrice));
      if (filters.inStockOnly) query.set("inStockOnly", "true");
      if (filters.sortBy) query.set("sortBy", filters.sortBy);

      const res = await fetch(`/api/products?${query.toString()}`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast.error("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(filters);
  }, [filters]);

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
    fetchProducts(filters);
  };

  const handleEdit = async (id: string) => {
    const product = await fetch(`/api/products/${id}`).then((res) =>
      res.json()
    );
    setEditingProduct(product);
    setModalOpen(true);
  };

  // En vez de eliminar directamente, guardamos el id para mostrar modal
  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  // Confirmar eliminación
  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/products/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar producto");
      toast.success("Producto eliminado correctamente");
      fetchProducts(filters);
    } catch {
      toast.error("Error al eliminar el producto");
    } finally {
      setDeleteId(null);
    }
  };

  // Cancelar eliminación
  const cancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <>
      <div className="p-6 mx-auto ">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold  text-gray-800">Productos</h1>

          <button
            onClick={() => {
              setEditingProduct(null);
              setModalOpen(true);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md transition focus-visible:outline focus-visible:outline-indigo-600"
          >
            + Nuevo Producto
          </button>
        </div>

        <ProductFilters
          categories={categories}
          filters={filters}
          onChange={setFilters}
        />

        {loading ? (
          <div className="flex justify-center items-center p-20 text-gray-500 font-semibold text-lg">
            Cargando productos...
          </div>
        ) : products.length === 0 ? (
          <div className="flex justify-center items-center p-20 text-gray-500 font-semibold text-lg">
            No hay productos disponibles.
          </div>
        ) : (
          <>
            {/* Desktop grid */}
            <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  {/* Imagen arriba */}
                  <div className="relative w-full pt-[75%] overflow-hidden rounded-t-xl border-b border-gray-200">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Detalles abajo */}
                  <div className="flex flex-col flex-1 p-6 gap-2">
                    <h2
                      className="text-xl font-semibold text-gray-900 truncate"
                      title={product.name}
                    >
                      {product.name}
                    </h2>

                    <p className="text-indigo-600 font-extrabold text-xl">
                      ${product.price.toFixed(2)}
                    </p>

                    {/* Aquí talles, colores, stock... */}
                    {/* Stock */}
                    <p className="text-gray-500 text-sm">
                      Stock disponible:{" "}
                      <span className="font-medium text-gray-700">
                        {product.variants?.reduce(
                          (total, v) => total + v.stock,
                          0
                        ) ?? 0}
                      </span>
                    </p>

                    {/* Categoría */}
                    <p className="flex items-center text-gray-400 text-sm gap-1">
                      <Tag className="w-4 h-4" />
                      <span>{product.category?.name || "Sin categoría"}</span>
                    </p>

                    {/* Talles */}
                    {product.variants &&
                      Array.from(
                        new Map(
                          product.variants.map((v) => [v.size.id, v.size])
                        ).values()
                      ).length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {Array.from(
                            new Map(
                              product.variants.map((v) => [v.size.id, v.size])
                            ).values()
                          ).map((size) => (
                            <span
                              key={size.id}
                              className="px-3 py-1 border border-gray-300 rounded-full text-gray-700 text-sm font-medium select-none"
                              title={`Talle: ${size.name}`}
                            >
                              {size.name}
                            </span>
                          ))}
                        </div>
                      )}

                    {/* Colores */}
                    {product.variants &&
                      Array.from(
                        new Map(
                          product.variants.map((v) => [v.color.id, v.color])
                        ).values()
                      ).length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          {Array.from(
                            new Map(
                              product.variants.map((v) => [v.color.id, v.color])
                            ).values()
                          ).map((color) => (
                            <div
                              key={color.id}
                              title={`Color: ${color.name}`}
                              className="w-6 h-6 rounded-full border border-gray-300"
                              style={{ backgroundColor: color.hex }}
                            />
                          ))}
                        </div>
                      )}

                    <div className="w-full mt-auto flex justify-end pt-4 border-t border-gray-100">
                      {/* Botones editar/eliminar */}
                      <ProductActions
                        productId={product.id}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile list */}
            <div className="flex flex-col space-y-4 md:hidden">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex bg-white rounded-lg shadow p-3 gap-4"
                >
                  {/* Imagen más chica a la izquierda */}
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Detalles a la derecha */}
                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      <h2
                        className="text-lg font-semibold text-gray-900 truncate"
                        title={product.name}
                      >
                        {product.name}
                      </h2>

                      <p className="text-indigo-600 font-extrabold text-lg mt-1">
                        ${product.price.toFixed(2)}
                      </p>

                      {/* Muestra compacta de talles y colores */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {/* Aquí muestra talles, ejemplo */}
                        {product.variants &&
                          Array.from(
                            new Map(
                              product.variants.map((v) => [v.size.id, v.size])
                            ).values()
                          )
                            .slice(0, 3)
                            .map((size) => (
                              <span
                                key={size.id}
                                className="px-2 py-0.5 border border-gray-300 rounded-full text-xs text-gray-700 select-none"
                                title={`Talle: ${size.name}`}
                              >
                                {size.name}
                              </span>
                            ))}
                        {/* Y colores */}
                        {product.variants &&
                          Array.from(
                            new Map(
                              product.variants.map((v) => [v.color.id, v.color])
                            ).values()
                          )
                            .slice(0, 3)
                            .map((color) => (
                              <div
                                key={color.id}
                                title={`Color: ${color.name}`}
                                className="w-5 h-5 rounded-full border border-gray-300"
                                style={{ backgroundColor: color.hex }}
                              />
                            ))}
                      </div>
                    </div>

                    {/* Botones */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="flex-1 bg-indigo-600 text-white rounded-md py-2 text-sm font-semibold hover:bg-indigo-700 transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 bg-red-600 text-white rounded-md py-2 text-sm font-semibold hover:bg-red-700 transition"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {modalOpen && (
          <ProductModal product={editingProduct} onClose={handleCloseModal} />
        )}
      </div>

      {/* Modal personalizado para confirmar eliminación */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 ba">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">
              ¿Estás seguro que deseas eliminar este producto?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
