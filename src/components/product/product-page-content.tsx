'use client'
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useProduct } from "@/hooks/queries/use-product"
import { useAddToCart } from "@/hooks/mutations/use-add-to-cart"
import ProductPageSkeleton from "@/components/product/product-page-skeleton"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getImageUrl } from "@/lib/get-image-url"
import type { ProductOptionValueDTO } from "@/types/dto/product.dto"
import PriductOptionsModalList from "@/components/product/product-options-modal-list"

interface IProductPageContentProps {
  productId: string
}

const ProductPageContent = ({ productId }: IProductPageContentProps) => {
    const { data: product, isPending, isError } = useProduct(productId)
    const { mutate: addToCart } = useAddToCart()

    const [selectedOptions, setSelectedOptions] = useState<ProductOptionValueDTO[]>([])

    if (isPending) return <ProductPageSkeleton />
    if (isError || !product) return null

    const totalPrice = product.price.amount + selectedOptions.reduce((sum, o) => sum + (o.extraPrice?.amount ?? 0), 0)

    const hasOptions = (product.optionGroups?.length ?? 0) > 0

    const handleAddToCart = () => {
        addToCart({ productId: product._id ?? product.id!, quantity: 1, selectedOptions })
    }


    return (
        <div className="container mx-auto p-0">
        <div
            className={cn(
                "w-full   py-4 mx-auto",
                hasOptions  &&  " grid grid-cols-2 gap-4 items-start"
            )}
        >
            <div className="max-w-[700px] mx-auto flex flex-col justify-between items-start flex-[50%]">
                <h1 className="text-[32px] font-bold mb-4">{product.title}</h1>
                <Image
                src={getImageUrl(product.image.src)}
                alt={product.image.alt ?? product.title}
                width={305}
                height={203}
                className="w-full mb-4"
                unoptimized
                />

                {/** Product description */}
                {(product.components?.length ?? 0) > 0 && (
                    <>
                        <ul className="flex text-white rounded-md  text-center">
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
                        </ul>
                    </>
                )}
                <div className="w-full flex justify-between items-center  my-5">
                    <h6 className="text-[18px]">Вага — {product.weightGrams}г</h6>
                    <div>
                        <span className="text-[25px] font-bold">{totalPrice} </span>
                        <span className="font-medium text-[12px]">
                            {product.price.currency}
                        </span>
                    </div>
                </div>
                <Button
                    className="w-full h-[50px]! max-h-auto  rounded-[12px] text-[20px] px-[26px] py-[14px]"
                    onClick={handleAddToCart}
                >
                    {product.ctaLabel ?? 'До кошика'}
                </Button>
            </div>
            <div>


                <div className="flex  flex-col gap-4 mb-[25px] ">


                    <div className="w-full px-3 ">
                        <PriductOptionsModalList
                            product={product}
                            onSelectionChange={setSelectedOptions}
                            scrollable={false}
                        />
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductPageContent