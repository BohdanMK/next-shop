'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { FetchProductsParams } from "@/services/product.service"
import { useSubCategories } from "@/hooks/queries/use-categories"
import { cn } from "@/lib/utils"

interface CatalogSubCategoriesProps {
    filters: FetchProductsParams,
}

const CatalogSubCategories = ({ filters }: CatalogSubCategoriesProps) => {
    if (filters.categoryId === undefined) return null
    const { data: subCategories, isPending, isError } = useSubCategories(filters.categoryId)

    if (isPending) {
        return (
            <div className="flex w-full gap-4">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="h-8 w-24 shrink-0 rounded bg-muted animate-pulse" />
                ))}
            </div>
        )
    }

    if (!subCategories || isError) return null

    return (
        <div className="flex gap-x-3 gap-y-2 flex-wrap">
            <Button
                className={cn(
                    "w-[110px] bg-foreground text-muted hover:text-foreground transition-all",
                    !filters.subCategoryId && "bg-primary border-primary text-foreground"
                )}
                variant="outline" size="sm"
                asChild
            >
                <Link href={`/catalog?categoryId=${filters.categoryId}&name=${filters.name}`}>
                   Всі
                </Link>
            </Button>
            {subCategories.map((subCategory) => (
                <Button
                    className={cn(
                        "w-[110px] bg-foreground text-muted hover:text-foreground transition-all",
                        subCategory._id === filters.subCategoryId && "bg-primary border-primary text-foreground"
                    )}
                    key={subCategory._id ?? subCategory.id}
                    variant="outline" size="sm"
                    asChild
                >
                    <Link href={`/catalog?categoryId=${filters.categoryId}&name=${filters.name}&subCategoryId=${subCategory._id ?? subCategory.id}`}>
                        {subCategory.title}
                    </Link>
                </Button>
            ))}
        </div>
    )
}

export default CatalogSubCategories
