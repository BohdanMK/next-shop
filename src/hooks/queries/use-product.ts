import { useQuery } from "@tanstack/react-query"
import { fetchProducts, fetchProduct, type FetchProductsParams } from "@/services/product.service"

export const PRODUCTS_QUERY_KEY = "products"

export function useProducts(params?: FetchProductsParams) {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, params],
    queryFn: () => fetchProducts(params),
  })
}


export const PRODUCT_QUERY_KEY = "product"

export function useProduct(id: string) {
  return useQuery({
    queryKey: [PRODUCT_QUERY_KEY, id],
    queryFn: () => fetchProduct(id),
  })
}