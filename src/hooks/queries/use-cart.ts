import { useQuery } from "@tanstack/react-query"
import { fetchCart } from "@/services/cart.service"

export const CART_QUERY_KEY = ["cart"] as const

export function useCart() {
  return useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: fetchCart,
  })
}