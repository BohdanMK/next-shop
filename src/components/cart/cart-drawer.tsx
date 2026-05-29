"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import CloseBtn from "@/components/shared/close-btn"
import CartItem from "@/components/cart/cart-item"
import { useCart } from "@/hooks/queries/use-cart"

interface CartDrawerProps {
  open?: boolean
  onClose?: () => void
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { data: cart } = useCart()

  return (
    <Drawer direction="right" open={open} onClose={onClose}>
      <DrawerContent className="rounded-none!">
        <DrawerHeader className="flex justify-between items-center relative border-b border-border">
          <DrawerTitle className="text-2xl text-primary-foreground">Кошик</DrawerTitle>
          {onClose && (
            <DrawerClose asChild>
              <CloseBtn onClose={onClose} />
            </DrawerClose>
          )}
        </DrawerHeader>

        <div className="no-scrollbar overflow-y-auto px-4 py-4">
          {!cart?.items?.length ? (
            <p className="text-2xl text-center text-foreground py-8">Кошик порожній</p>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.items.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>

        <DrawerFooter className="border-t border-border">
          <div className="text-[16px]">
            <div className="flex justify-between items-center border-b border-dashed pb-2 mb-2">
              <div>Сума</div>
              <div>{cart?.totalPrice ?? 0} грн</div>
            </div>
            <div className="flex justify-between items-end border-b border-dashed pb-2 mb-2">
              <div>
                <span>Доставка</span>
                <span className="max-w-[150px] block text-foreground text-[12px]">
                  До безкоштовної доставки залишилось 0 грн
                </span>
              </div>
              <div>100 грн</div>
            </div>
            <div className="flex justify-between items-center border-b border-dashed pb-2 mb-2">
              <div>Разом</div>
              <div>{cart ? cart.totalPrice + 100 : 0} грн</div>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full h-fit py-[20px] font-semibold text-[16px] rounded-lg leading-[100%]"
          >
            Оформити замовлення
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default CartDrawer
