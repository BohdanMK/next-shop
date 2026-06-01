'use client'
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import CartDrawer from "@/components/cart/cart-drawer"

interface ICartButtonProps {
    count: number
    className?: string
}

const CartButton = ({ count, className }: ICartButtonProps) => {
    const [ isOpen, setIsOpen ] = useState(false)

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            <div className={cn("relative", className)}>
                <Button
                    data-testid="cart-open-btn"
                    variant="ghost" size="icon"
                    onClick={handleOpen}
                >
                    <img src="/icons/shopping-basket.svg" alt="Cart" className="invert dark:invert-0" />

                </Button>
                {count > 0 && (
                    <span data-testid="cart-count-badge" className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full size-4 flex items-center justify-center">
                        {count > 99 ? "99+" : count}

                    </span>
                )}
            </div>
            <CartDrawer
                open={isOpen}
                onClose={handleClose}
            />
        </>
    )
}

export default CartButton