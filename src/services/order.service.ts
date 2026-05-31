import type { OrderDTO } from "@/types/dto/order.dto"
import { API_ENDPOINTS } from "@/config/api-endpoints"
import { apiFetch } from "@/lib/api-fetch"

export async function createOrder(body: OrderDTO): Promise<OrderDTO> {
  const res = await apiFetch(API_ENDPOINTS.orders.create, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!res.ok) throw new Error("Failed to create order")

  return res.json()
}