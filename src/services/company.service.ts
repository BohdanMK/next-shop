import { CompanyInfo } from "@/types/dto/company.dto"
import { API_ENDPOINTS } from "@/config/api-endpoints"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchCompanyInfo(): Promise<CompanyInfo> {
  const res = await fetch(`${API_URL}${API_ENDPOINTS.companyInfo.list}`)

  if (!res.ok) {
    throw new Error("Failed to fetch company info")
  }

  return res.json()
}