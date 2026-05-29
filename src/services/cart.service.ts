import type { CartDTO, AddToCartBody } from "@/types/dto/cart.dto"
import { API_ENDPOINTS } from "@/config/api-endpoints"
import { apiFetch } from "@/lib/api-fetch"

export async function fetchCart(): Promise<CartDTO> {
  const res = await apiFetch(API_ENDPOINTS.cart.list)

  if (!res.ok) throw new Error("Failed to fetch cart")

  return res.json()
}

export async function addToCart(body: AddToCartBody): Promise<CartDTO> {
  const res = await apiFetch(API_ENDPOINTS.cart.addItem, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!res.ok) throw new Error("Failed to add item to cart")

  return res.json()
}

export async function increaseCartItem(id: string, quantity: number): Promise<CartDTO> {
  const res = await apiFetch(API_ENDPOINTS.cart.increase, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItemId: id, quantity }),
  })

  if (!res.ok) throw new Error("Failed to increase cart item")

  return res.json()
}

export async function decreaseCartItem(id: string, quantity: number): Promise<CartDTO> {
  const res = await apiFetch(API_ENDPOINTS.cart.decrease, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItemId: id, quantity }),
  })

  if (!res.ok) throw new Error("Failed to decrease cart item")

  return res.json()
}

export async function deleteCartItem(id: string): Promise<CartDTO> {
  const res = await apiFetch(API_ENDPOINTS.cart.deleteItem, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItemId: id }),
  })

  if (!res.ok) throw new Error("Failed to delete cart item")

  return res.json()
}