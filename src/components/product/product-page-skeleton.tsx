import { Skeleton } from "@/components/ui/skeleton"

const ProductPageSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2  gap-8">
    <Skeleton className="w-full aspect-square rounded-[5px]" />

    <div className="flex flex-col gap-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-5 w-1/3" />

      <div className="flex flex-col gap-2 mt-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="flex gap-2 mt-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="w-14 h-14 rounded-md" />
        ))}
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Skeleton className="h-10 w-36 rounded-[12px]" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  </div>
)

export default ProductPageSkeleton
