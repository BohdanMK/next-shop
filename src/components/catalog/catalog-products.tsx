'use client'
import { useTranslations } from "next-intl"
import type { FetchProductsParams } from "@/services/product.service"
import { useProducts } from "@/hooks/queries/use-product"
import ProductCard from "@/components/product/product-card"
import ProductCardSkeleton from "@/components/product/product-card-skeleton"
import CatalogSubCategories from "@/components/catalog/catalog-sub-categories"

interface CatalogProductsProps {
  filters: FetchProductsParams,
  blockTitle?: string
}

const CatalogProducts = ({ filters, blockTitle }: CatalogProductsProps) => {
  const t = useTranslations('catalog')
  const { data: products, isLoading } = useProducts(filters)

  if (isLoading) return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )

  return (
    <>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-foreground">
                {blockTitle ?? t('defaultTitle')}
            </h2>
        </div>
        <div className="mb-4">
            <CatalogSubCategories filters={filters} />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        {products?.items.map(product => (
            <ProductCard key={product._id ?? product.id} product={product} />
        ))}
        </div>
    </>
  )
}

export default CatalogProducts