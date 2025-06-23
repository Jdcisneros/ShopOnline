/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/productCard";

export default async function SearchPage(props: any) {
  const q = props.searchParams?.q ?? "";
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: q,
        mode: "insensitive",
      },
    },
  });

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Resultados para: <span className="text-blue-600">{q}</span>
      </h1>
      {products.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
