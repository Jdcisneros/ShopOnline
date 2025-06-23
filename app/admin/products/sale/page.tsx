
import { prisma } from "@/lib/prisma";
import React from "react";
import OnSaleProductsClient from "./saleProducts";

export default async function SaleProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return <OnSaleProductsClient products={products} categories={categories} />;
}
