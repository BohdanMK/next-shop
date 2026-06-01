import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addToCart, increaseCartItem, decreaseCartItem, deleteCartItem } from "@/services/cart.service"
import type { AddToCartBody } from "@/types/dto/cart.dto"
import { toast } from "sonner"
import { getImageUrl } from "@/lib/get-image-url"

export function useAddToCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: AddToCartBody) => addToCart(body),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      const addedItem = data?.items?.find((item) => item.productId === variables.productId)
      if (addedItem) {
        toast.success('', {
          id: "toast-add-to-cart-success",
          icon: null,
          position: "bottom-right",
          description: (
            <div className="flex items-center gap-2">
              <img
                src={getImageUrl(addedItem.image.src)}
                alt={addedItem.image.alt ?? addedItem.title}
                className="size-10 rounded object-cover"
              />
              <span className="text-sm text-foreground">{addedItem.title} додано в кошик</span>
            </div>
          ),
        })
      } else {
        toast.error("Не вдалось додати товар", { id: "toast-add-to-cart-error" })
      }
    },
    onError: () => {
      toast.error("Не вдалось додати товар", { id: "toast-add-to-cart-error" })
    },
  })
}

export function useIncreaseCartItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: { id: string, quantity: number }) => increaseCartItem(body.id, body.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
    onError: () => {
      toast.error("Помилка оновлення кількості", { id: "toast-cart-update-error" })
    },
  })
}

export function useDecreaseCartItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: { id: string, quantity: number }) => decreaseCartItem(body.id, body.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
    onError: () => {
      toast.error("Помилка оновлення кількості", { id: "toast-cart-update-error" })
    },
  })
}

export function useDeleteCartItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: { id: string }) => deleteCartItem(body.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
    onError: () => {
      toast.error("Не вдалось видалити товар", { id: "toast-cart-delete-error" })
    },
  })
}