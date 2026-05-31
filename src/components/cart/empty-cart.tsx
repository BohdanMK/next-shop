import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/config/routes"
import Link from "next/link"

interface EmptyCartProps {
    description?: string
    showAction?: boolean
}

const EmptyCart = ({ description = "Додайте страви щоб оформити замовлення", showAction = true }: EmptyCartProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
            <ShoppingCart className="size-16 text-foreground opacity-40" />
            <div>
                <p className="text-xl font-semibold text-foreground">Кошик порожній</p>
                <p className="text-sm text-foreground mt-1">{description}</p>
            </div>
            {showAction && (
                <Button asChild variant="outline" className="rounded-full mt-2">
                    <Link href={ROUTES.home}>Перейти до меню</Link>
                </Button>
            )}
        </div>
    )
}

export default EmptyCart
