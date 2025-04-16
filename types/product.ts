// types/product.ts
export interface Supplier {
  id: string;
  businessType: string;
  rating: number;
  fulfillmentRate: number;
  responseTime: string;
  image: string;
  user?: {
    name: string;
    id: string;
  };
}

export interface Product {
  id: string;
  name: string;
  category: string;
  supplierPrice: number;
  recommendedPrice: number;
  profit: number;
  profitMargin: number;
  rating: number;
  reviews: number;
  sales: number;
  marketFitScore: number;
  trending: boolean;
  stock: number;
  image: string;
  supplier: Supplier;
  plugsCount: number;
  description?: string;
  tags?: string[];
  createdAt?: string;
  images?: string[];
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

export interface ProductQueryParams {
  cursor?: string;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  supplierIds?: string[];
  businessType?: string;
  createdAfter?: string;
  createdBefore?: string;
  tags?: string;
  rating?: number;
}