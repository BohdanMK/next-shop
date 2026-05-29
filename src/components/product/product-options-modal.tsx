"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { getImageUrl } from "@/lib/get-image-url"
import type { IProductDTO, ProductOptionValueDTO } from "@/types/dto/product.dto"
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import PriductOptionsModalList from "@/components/product/product-options-modal-list"
import CloseBtn from "@/components/shared/close-btn"
import { useAddToCart } from "@/hooks/mutations/use-add-to-cart"

interface ProductOptionsModalProps {
  open: boolean
  onClose: () => void
  product: IProductDTO
}

export default function ProductOptionsModal({
  open,
  onClose,
  product,
}: ProductOptionsModalProps) {
  const [selectedOptions, setSelectedOptions] = useState<ProductOptionValueDTO[]>([])
  const totalPrice = product.price.amount + selectedOptions.reduce((sum, o) => sum + (o.extraPrice?.amount ?? 0), 0)

  const { mutate: addToCart, isPending } = useAddToCart()

  const handleAddToCart = () => {
    addToCart({
      productId: product._id ?? product.id!,
      quantity: 1,
      selectedOptions: selectedOptions.map(({ id, label, extraPrice }) => ({ id, label, extraPrice })),
    })
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[305px] gap-0 p-0 bg-card rounded-[8px] overflow-hidden"
      >
        <DialogTitle className="sr-only">{product.title}</DialogTitle>
        {/* Image + close button */}
        <div className="relative w-full h-[203px]">
          <Image
            src={getImageUrl(product.image.src)}
            alt={product.image.alt ?? product.title}
            fill
            className="object-cover"
          />
          <CloseBtn onClose={onClose} />

        </div>

        {/* Title with tooltip on truncate */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <h4 className="truncate my-5 px-5 text-base font-black text-left cursor-pointer">
                {product.title}
              </h4>
            </TooltipTrigger>
            <TooltipContent side="top" align="start" className="max-w-[250px] px-3 py-2 text-lg font-medium rounded-md">
              {product.title}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* componets */}
        <div className="flex px-5 pb-7 gap-x-3 gap-y-2 flex-wrap">
            {product.components!.map((comp, idx) => (
            <li key={`${product.id ?? product.title}-comp-${idx}`} className="w-[55px] list-none">
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
        </div>
        {/* Options */}
        <div className="w-full px-3">
            <PriductOptionsModalList product={product} onSelectionChange={setSelectedOptions} />
        </div>
        <DialogFooter>
            <div className="w-full flex justify-between items-center px-3 pb-5 py-2">

                <div>
                    <span className="text-[20px] font-bold">{totalPrice} </span>
                    <span className="font-medium text-[12px]">
                        {product.price.currency}
                    </span>
                </div>
                <Button variant="outline" onClick={handleAddToCart} disabled={isPending}>
                    {isPending ? "Додається..." : "Додати до кошика"}
                </Button>
            </div>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
