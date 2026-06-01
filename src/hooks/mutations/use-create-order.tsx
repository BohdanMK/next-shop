import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { createOrder } from "@/services/order.service"
import type { OrderDTO } from "@/types/dto/order.dto"
import { ROUTES } from "@/config/routes"
import { toast } from "sonner"

export function useCreateOrder() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (body: OrderDTO) => createOrder(body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      toast.success("Замовлення створено", { id: "toast-order-success" })
      if (data._id) {
        router.push(ROUTES.checkoutSuccess(data._id))
      }
    },
    onError: () => {
      toast.error("Помилка створення замовлення", { id: "toast-order-error" })
    },
  })
}