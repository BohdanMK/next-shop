import { CompanyInfo } from "@/types/dto/company.dto"
import { API_ENDPOINTS } from "@/config/api-endpoints"
import { apiFetch } from "@/lib/api-fetch"

export async function fetchCompanyInfo(): Promise<CompanyInfo> {
  const res = await apiFetch(API_ENDPOINTS.companyInfo.list)

  if (!res.ok) throw new Error("Failed to fetch company info")

  return res.json()
}