/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProductById } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductClientDetail from "./DetailClientServer";

export default async function ProductDetailPage({ params }: any) {
  const product = await getProductById(params.id);

  if (!product) notFound();

  return <ProductClientDetail product={product} />;
}
