import { Skeleton } from "@/components/ui/skeleton"

const ProductCardSkeleton = () => (
  <div className="w-full max-w-[305px] bg-card rounded-[5px] overflow-hidden shadow-md/10 mb-2">
    <Skeleton className="w-full h-[203px] rounded-none" />
    <div className="mt-[5px] mx-[11px] pb-[15px]">
      <Skeleton className="h-5 w-3/4 mb-[20px]" />
      <div className="flex justify-between mb-[11px]">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-4 w-32 mb-[25px]" />
      <div className="flex justify-between items-end">
        <Skeleton className="h-9 w-28 rounded-[12px]" />
        <Skeleton className="h-7 w-16" />
      </div>
    </div>
  </div>
)

export default ProductCardSkeleton
