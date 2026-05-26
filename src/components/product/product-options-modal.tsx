"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { getImageUrl } from "@/lib/get-image-url"
import type { IProductDTO } from "@/types/dto/product.dto"
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import Extras from "@/components/product/product-options-modal-list"

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
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-3 end-3 size-8 bg-card hover:bg-card/80 border-y-0 border-x border-x-primary rounded-[5px]"
          >
            <X className="size-5" />
          </Button>
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
            <Extras product={product} />
        </div>
        <DialogFooter>
            <div className="w-full flex justify-between items-center px-3 pb-5 py-2">

                <div>
                    <span className="text-[20px] font-bold">{product.price.amount} </span>
                    <span className="font-medium text-[12px]">
                        {product.price.currency}
                    </span>
                </div>
                <Button variant="outline" onClick={() => console.log('click')}>
                    Додати до кошика
                </Button>
            </div>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
