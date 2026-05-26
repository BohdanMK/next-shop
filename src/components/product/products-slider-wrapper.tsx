'use client'
import type { FetchProductsParams } from "@/services/product.service"
import { useProducts } from "@/hooks/queries/use-product"
import ProductSlider from "./product-slider"
import ProductCardSkeleton from "./product-card-skeleton"

interface ProductsSliderProps {
  params?: FetchProductsParams
  showAllHref?: string | null
  blockTitle?: string
}

const SKELETON_COUNT = 3

const ProductsSlider = ({ params, showAllHref, blockTitle }: ProductsSliderProps) => {
  const { data: products, isLoading } = useProducts(params)

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <div key={i} className="min-w-0 flex-1">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!products?.items?.length) return null

  return (
    <div className="container mx-auto">
      <ProductSlider
        products={products.items}
        blockTitle={blockTitle}
        showAllHref={showAllHref}
      />
    </div>
  )
}

export default ProductsSlider
