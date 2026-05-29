'use client'
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { InfoIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { getImageUrl } from "@/lib/get-image-url"
import { getProductUrl } from "@/lib/get-product-url"
import type { IProductDTO  } from "@/types/dto/product.dto"
import ProductOptionsModal from "@/components/product/product-options-modal"
import { useAddToCart } from "@/hooks/mutations/use-add-to-cart"

interface ProductCardProps {
  product: IProductDTO
  fullWidth?: boolean
}

const ProductCard = ({ product, fullWidth }: ProductCardProps) => {

  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false)
  const currency = product.price.currency === 'UAH' ? 'грн' : product.price.currency
  const { mutate: addToCart } = useAddToCart()

  const handleAddToCart = () => {
    if (product?.optionGroups && product.optionGroups.length > 0) {
      setIsOptionsModalOpen(true)
    } else {
      addToCart({ productId: product._id ?? product.id!, quantity: 1, selectedOptions: [] })
    }
  }

  return (
    <div className={cn(
      "w-full max-w-[305px] bg-card rounded-[5px] overflow-hidden shadow-md/10 mb-2",
      fullWidth && "max-w-full !h-full"
    )}>
      <Link href={getProductUrl(product)}>
        <div className={cn(
          "w-full max-w-[305px] max-h-[203px]",
          fullWidth && "max-w-full overflow-hidden"
        )}>
          <Image
            src={getImageUrl(product.image.src)}
            alt={product.image.alt ?? product.title}
            width={305}
            height={203}
            className="w-full"
            unoptimized
          />
        </div>
      </Link>

      <div className="mt-[5px] mx-[11px] pb-[15px]">
        <div className="mb-[20px]">
             <Tooltip>
                <TooltipTrigger>
                  <Link href={getProductUrl(product)}>
                    <h4
                      title={product.title}
                      className="line-clamp-1 text-[16px] font-black text-left cursor-pointer"
                    >
                      {product.title}
                    </h4>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-popover text-white rounded-md p-2 text-center">
                  {product.title}
                </TooltipContent>
             </Tooltip>
        </div>

        <div className="flex justify-between text-[14px] mb-[11px]">
          <h6>Склад:</h6>
          <h6>Вага — {product.weightGrams}г</h6>
        </div>

        <div className="flex items-center gap-2 mb-[25px]">
          <h6 className="text-[14px]">Інгредієнти: {product.components?.length ?? 0}</h6>
          {(product.components?.length ?? 0) > 0 && (
            <div className="relative">
                <Tooltip>
                    <TooltipTrigger>
                        <InfoIcon className="w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-popover text-white rounded-md p-2 text-center">
                        {product.components!.map((comp, idx) => (
                        <li key={`${product.id ?? product.title}-comp-${idx}`} className="w-[55px]">
                            <div className="w-[55px] h-[38px]">
                            <Image
                                src={getImageUrl(comp.image.src)}
                                alt={comp.image.alt ?? comp.name}
                                width={55}
                                height={38}
                                className="w-full"
                                unoptimized
                            />
                            </div>
                            <h6 className="h-[15px] text-[10px] text-center">{comp.name}</h6>
                        </li>
                        ))}
                    </TooltipContent>
                </Tooltip>
            </div>
          )}
        </div>
        {/* { product.optionGroups && product.optionGroups.length > 0 && (
          <div className="flex items-center gap-2 mb-[25px]">
            <h6 className="text-[14px]">Опції: {product.optionGroups?.length ?? 0}</h6>
            <InfoIcon className="w-4 h-4" />
          </div>
        )} */}
        <div className="flex justify-between px-[0px] items-end">
          <Button
            className="rounded-[12px] text-[14px] px-[26px] py-[4px]"
            onClick={handleAddToCart}
          >
            {product.ctaLabel ?? 'До кошика'}
          </Button>

          {/* <ProductOptionsModal*/}
          <ProductOptionsModal
            open={isOptionsModalOpen}
            onClose={() => setIsOptionsModalOpen(false)}
            product={product}
            />

          {!product.isOnSale ? (
            <div className="min-h-[48px] flex items-center gap-[5px] text-[20px] font-bold">
              {product.price.amount}
              <span className="font-medium text-[12px]">{currency}</span>
            </div>
          ) : (
            <div className="min-h-[48px] flex flex-col items-start gap-[0px] text-[20px] font-bold">
              <div className="text-[16px] mt-auto  line-through">
                <span>{product.price.amount}</span>
                <span className="font-medium text-[12px]">{currency}</span>
              </div>
              <div className="text-primary leading-[105%]">
                <span>{product.salePrice}</span>
                <span className="font-medium text-[12px]">{currency}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
