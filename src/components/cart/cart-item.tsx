"use client"

import { X, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getImageUrl } from "@/lib/get-image-url"
import type { CartItemDTO } from "@/types/dto/cart.dto"
import { useIncreaseCartItem, useDecreaseCartItem, useDeleteCartItem } from "@/hooks/mutations/use-add-to-cart"

interface CartItemProps {
  item: CartItemDTO
}

const CartItem = ({ item }: CartItemProps) => {

  const { mutate: increaseCartItem } = useIncreaseCartItem()
  const { mutate: decreaseCartItem } = useDecreaseCartItem()
  const { mutate: deleteCartItem } = useDeleteCartItem()
  return (
    <div data-testid="cart-item" className="relative border-b border-border py-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-[85px] h-[56px] border border-border rounded-sm overflow-hidden">
          <img src={getImageUrl(item.image.src)} alt={item.image.alt ?? item.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col max-w-[150px]">
          <p data-testid="cart-item-title" className="text-[16px] font-bold break-words">{item.title}</p>
        </div>
        <Button
          data-testid="cart-item-remove"
          variant="text"
          className="absolute top-[0px] right-[0px] w-[28px] h-[28px] bg-card hover:bg-primary hover:text-primary-foreground border-y-0 border-x border-x-primary rounded-[5px]"
          onClick={() => deleteCartItem({ id: item._id as string })}
        >
          <X className="size-5" />
        </Button>
      </div>
      <div className="flex gap-2 items-center justify-between">
        <div data-testid="cart-item-price" className="flex gap-2 items-center text-[16px]">
          {item.itemPrice * item.quantity} {item.price.currency}
        </div>
        <div className="flex gap-2 items-center">
          <Button
            data-testid="cart-item-decrease"
            variant="outline"
            className="w-[23px] h-[23px] bg-card hover:bg-primary border-y-0 border-x border-x-primary rounded-[5px]"
            onClick={() => decreaseCartItem({ id: item._id as string, quantity: 1 })}
          >
            <Minus className="size-4" />
          </Button>
          <Input
            data-testid="cart-item-quantity"
            type="number"
            className="p-0 text-center max-w-[50px] border-0 outline-none shadow-none focus-visible:ring-0 focus-visible:border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={item.quantity}
            readOnly
          />
          <Button
            data-testid="cart-item-increase"
            variant="outline"
            className="w-[23px] h-[23px] bg-card hover:bg-primary border-y-0 border-x border-x-primary rounded-[5px]"
            onClick={() => increaseCartItem({ id: item._id as string, quantity: item.quantity + 1 })}
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
