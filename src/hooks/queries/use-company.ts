import { useQuery } from "@tanstack/react-query"
import { fetchCompanyInfo } from "@/services/company.service"

export const COMPANY_INFO_QUERY_KEY = ["company_info"] as const

export function useCompanyInfo() {
  return useQuery({
    queryKey: COMPANY_INFO_QUERY_KEY,
    queryFn: fetchCompanyInfo,
  })
}