import type { ICategoryInfoDTO, ISubCategoriesDTO } from "@/types/dto/category.dto"
import { API_ENDPOINTS } from "@/config/api-endpoints"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchCategories(): Promise<ICategoryInfoDTO[]> {
  const res = await fetch(`${API_URL}${API_ENDPOINTS.categories.list}`)

  if (!res.ok) {
    throw new Error("Failed to fetch categories")
  }

  return res.json()
}


// subCategories
export async function fetchSubCategories(id: number | string): Promise<ISubCategoriesDTO[]> {
  const res = await fetch(`${API_URL}${API_ENDPOINTS.categories.subCategories(id)}`)

  if (!res.ok) {
    throw new Error("Failed to fetch sub categories")
  }

  return res.json()
}