import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { fetchProduct } from "@/services/product.service"
import { PRODUCT_QUERY_KEY } from "@/hooks/queries/use-product"




const ProductLayout = async ({ children, params }: { children: React.ReactNode, params: Promise<{ id: string }> }) => {
    const { id } = await params
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
      queryKey: [PRODUCT_QUERY_KEY, id],
      queryFn: () => fetchProduct(id),
    })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}

export default ProductLayout