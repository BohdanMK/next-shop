import type { PaginatedResponse } from "@/types/dto/response.dto"
import type { IProductDTO } from "@/types/dto/product.dto"
import { API_ENDPOINTS } from "@/config/api-endpoints"
import { buildQuery } from "@/lib/build-query"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export interface FetchProductsParams {
  page?: number
  limit?: number
  categoryId?: string
  subCategoryId?: string
  isOnSale?: boolean,
  name?: string,
  search?: string
  sortBy?: 'createdAt' | 'title' | 'price' | 'salePrice'
  sortOrder?: 'asc' | 'desc'
}

export async function fetchProducts(params?: FetchProductsParams): Promise<PaginatedResponse<IProductDTO[]>> {
  const res = await fetch(`${API_URL}${API_ENDPOINTS.products.list}${buildQuery(params)}`)

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  return res.json()
}
