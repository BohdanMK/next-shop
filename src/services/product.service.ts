import type { PaginatedResponse } from "@/types/dto/response.dto"
import type { IProductDTO } from "@/types/dto/product.dto"
import { API_ENDPOINTS } from "@/config/api-endpoints"
import { buildQuery } from "@/lib/build-query"
import { apiFetch } from "@/lib/api-fetch"

export interface FetchProductsParams {
  _id?: string
  id?: string
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
  const res = await apiFetch(`${API_ENDPOINTS.products.list}${buildQuery(params)}`)

  if (!res.ok) throw new Error("Failed to fetch products")

  return res.json()
}

export async function fetchProduct(id: string): Promise<IProductDTO> {
  const res = await apiFetch(`${API_ENDPOINTS.products.list}/${id}`)

  if (!res.ok) throw new Error("Failed to fetch product")

  return res.json()
}