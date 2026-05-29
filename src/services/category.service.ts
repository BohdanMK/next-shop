import type { ICategoryInfoDTO, ISubCategoriesDTO } from "@/types/dto/category.dto"
import { API_ENDPOINTS } from "@/config/api-endpoints"
import { apiFetch } from "@/lib/api-fetch"

export async function fetchCategories(): Promise<ICategoryInfoDTO[]> {
  const res = await apiFetch(API_ENDPOINTS.categories.list)

  if (!res.ok) throw new Error("Failed to fetch categories")

  return res.json()
}

export async function fetchSubCategories(id: number | string): Promise<ISubCategoriesDTO[]> {
  const res = await apiFetch(API_ENDPOINTS.categories.subCategories(id))

  if (!res.ok) throw new Error("Failed to fetch sub categories")

  return res.json()
}