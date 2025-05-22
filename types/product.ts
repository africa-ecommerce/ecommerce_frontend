// types/product.ts
export interface Supplier {
  id: string;
  rating: number;
  // fulfillmentRate: number;
  // responseTime: string;
  image: string;
 name: string;
}


export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  sales: number;
  stock: number;
  image: string;
  supplier: Supplier;
  plugsCount: number;
  description?: string;
  tags?: string[];
  createdAt?: string;
  images: string[];

}

export interface ProductsResponseMeta {
  hasNextPage: boolean;
  nextCursor: string | null;
  count: number;
  totalCount: number | null;
}

export interface ProductsResponse {
  message: string;
  data: Product[];
  meta: ProductsResponseMeta;
}

// types/product.ts (or wherever your ProductQueryParams is defined)
export interface ProductQueryParams {
  limit: number;
  cursor?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  rating?: number;
  excludeIds?: string; // New parameter for backend optimization
  tags?: string;
}