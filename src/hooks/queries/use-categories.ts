import { useQuery } from "@tanstack/react-query"
import { fetchCategories, fetchSubCategories } from "@/services/category.service"

export const CATEGORIES_QUERY_KEY = ["categories_nav"] as const

export function useCategories() {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: fetchCategories,
  })
}


export const SUB_CATEGORIES_QUERY_KEY = (id: string | number) => ["sub_categories", id] as const

export function useSubCategories(id: number | string) {
  return useQuery({
    queryKey: SUB_CATEGORIES_QUERY_KEY(id),
    queryFn: () => fetchSubCategories(id),
  })
}