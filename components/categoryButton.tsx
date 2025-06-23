"use client";

import Link from "next/link";

export function CategoryButtons({
  categories,
}: {
  categories: { id: string; name: string }[];
}) {
  return (
    <section className="py-8 px-4 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Categorías</h2>
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.id}`}
            className="px-6 py-3 rounded-full border border-gray-300 bg-white hover:bg-pink-100 text-sm font-medium transition"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
