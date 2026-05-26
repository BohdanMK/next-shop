"use client"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useCategories } from "@/hooks/queries/use-categories"
import { getImageUrl } from "@/lib/get-image-url"
import { cn } from "@/lib/utils"

export function CategoriesNavList() {
  const { data: categories, isPending, isError } = useCategories()
  const searchParams = useSearchParams()
  const activeCategoryId = searchParams.get("categoryId")

  if (isPending) {
    return (
      <div className="flex w-full space-x-4 p-4 px-0">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-8 w-24 shrink-0 rounded bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (isError) return null

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <div className="flex w-max space-x-4 p-4 px-0 mx-auto">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={{
              pathname: `/catalog`,
              query: { categoryId:category._id, name: category.title },
            }}
            className={cn(
              "w-[110px] h-[96px] flex items-center flex-col justify-center px-[15px] py-[15px] gap-2",
              "rounded-[10px]",
              "border border-y-0 border-transparent",
              "hover:bg-[rgba(255,0,0,0.1)] hover:border-[#FF0000] hover:border-y-0 hover:border-x hover:cursor-pointer",
              "transition-all",
              activeCategoryId === category._id && "bg-[rgba(255,0,0,0.1)] border-[#FF0000] border-y-0 border-x"
            )}
          >


              <Image
                src={getImageUrl(category.image)}
                alt={category.title}
                width={60}
                height={48}
              />
             <h4 className="leading-none text-wrap wrap-break-word text-center text-[14px]">
              { category.title }
            </h4>
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export default CategoriesNavList
