// hooks/useProducts.ts
import useSWRInfinite from 'swr/infinite';
import { ProductsResponse, ProductQueryParams } from '@/types/product';
import { useDebounce } from './use-debounce';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export interface ProductsFilter {
  search: string;
  priceRange: [number, number];
  selectedCategories: string[];
  selectedRatings: number[];
  sortBy?: string;
  order?: 'asc' | 'desc';
  businessType?: string;
  createdAfter?: Date;
  createdBefore?: Date;
  tags?: string;
}

export function useProducts(filters: ProductsFilter, limit: number = 4) {
  const debouncedSearch = useDebounce(filters.search, 300);
  
  // Convert filters to query params
  const getKey = (pageIndex: number, previousPageData: ProductsResponse | null) => {
    // Reached the end
    if (previousPageData && !previousPageData.meta.hasNextPage) return null;
    
    // First page or with cursor for pagination
    const cursor = pageIndex > 0 && previousPageData ? previousPageData.meta.nextCursor : undefined;
    
    // Build query parameters
    const params: ProductQueryParams = {
      limit,
      cursor,
      search: debouncedSearch || undefined,
      minPrice: filters.priceRange[0] || undefined,
      maxPrice: filters.priceRange[1] || undefined,
      sortBy: filters.sortBy,
      order: filters.order,
      businessType: filters.businessType,
    };
    
    // Add category filter if any selected
    if (filters.selectedCategories.length === 1) {
      params.category = filters.selectedCategories[0];
    } else if (filters.selectedCategories.length > 1) {
      // For multiple categories, the backend might need to handle this differently
      // This is a simplification assuming backend supports comma-separated values
      params.category = filters.selectedCategories.join(',');
    }
    
    // Add rating filter (lowest selected rating)
    if (filters.selectedRatings.length > 0) {
      // Get the minimum rating from selected ratings
      params.rating = Math.min(...filters.selectedRatings);
    }
    
    // Add date filters if present
    if (filters.createdAfter) {
      params.createdAfter = filters.createdAfter.toISOString();
    }
    
    if (filters.createdBefore) {
      params.createdBefore = filters.createdBefore.toISOString();
    }
    
    // Build the URL with query parameters
    const queryString = Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join('&');
    
    return `/api/products?${queryString}`;
  };

  const {
    data,
    error,
    size,
    setSize,
    isValidating,
    mutate
  } = useSWRInfinite<ProductsResponse>(getKey, fetcher, {
    revalidateFirstPage: false,
    revalidateOnFocus: false,
    persistSize: true,
  });

  const isLoading = !data && !error;
  const isLoadingMore = size > 0 && data && typeof data[size - 1] === 'undefined';
  
  // Flatten the products from all pages
  const products = data ? data.flatMap(page => page.data) : [];
  
  // Determine if we have more pages to load
  const hasNextPage = data ? data[data.length - 1]?.meta.hasNextPage : false;

  return {
    products,
    error,
    isLoading,
    isLoadingMore,
    isValidating,
    size,
    setSize,
    hasNextPage,
    mutate
  };
}