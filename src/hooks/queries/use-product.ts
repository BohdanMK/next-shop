import { useQuery } from "@tanstack/react-query"
import { fetchProducts, type FetchProductsParams } from "@/services/product.service"

export const PRODUCTS_QUERY_KEY = "products"

export function useProducts(params?: FetchProductsParams) {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, params],
    queryFn: () => fetchProducts(params),
  })
}
