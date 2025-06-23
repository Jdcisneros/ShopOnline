export type ProductVariant = {
  id: string;
  productId: string;
  sizeId: string;
  colorId: string;
  stock: number;
  size: {
    id: string;
    name: string;
  };
  color: {
    id: string;
    name: string;
    hex: string;
  };
};

export type Category = {
  id: string;
  name: string;
  createdAt: Date;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string; // no nullable aquí
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  onSale: boolean;
  discountPercentage?: number;
  category: Category | null;
  variants: ProductVariant[];
  inStock: boolean; // tu propiedad calculada
};
