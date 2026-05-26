import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { fetchProducts, type FetchProductsParams } from "@/services/product.service"
import { fetchSubCategories } from "@/services/category.service"
import { PRODUCTS_QUERY_KEY } from "@/hooks/queries/use-product"
import { SUB_CATEGORIES_QUERY_KEY } from "@/hooks/queries/use-categories"
import BreadCrumbsList from "@/components/shared/bread-crumbs-list"
import CatalogProducts from "@/components/catalog/catalog-products"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const CatalogPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const params = await searchParams

  const filters: FetchProductsParams = {
    isOnSale: params.isOnSale === 'true',
    categoryId: params.categoryId as string | undefined,
    subCategoryId: params.subCategoryId as string | undefined,
    name: params.name as string | undefined,
    search: params.search as string | undefined,
    limit: 100,
  }

  const bredCrumbsList = [
    { name: 'Головна', href: '/' },
    ...(params.name ? [{ name: params.name as string, href: `/catalog?categoryId=${params.categoryId}&name=${params.name}` }] : []),
    ...(params.isOnSale ? [{ name: 'Акції', href: `/catalog?isOnSale=true` }] : []),
  ]

  const queryClient = new QueryClient()

  const prefetchTasks = [
    queryClient.prefetchQuery({
      queryKey: [PRODUCTS_QUERY_KEY, filters],
      queryFn: () => fetchProducts(filters),
    }),
  ]

  if (params.categoryId) {
    prefetchTasks.push(
      queryClient.prefetchQuery({
        queryKey: SUB_CATEGORIES_QUERY_KEY(params.categoryId as string),
        queryFn: () => fetchSubCategories(params.categoryId as string),
      })
    )
  }

  await Promise.all(prefetchTasks)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container">
        <div className="mb-4">
          <BreadCrumbsList list={bredCrumbsList} />
        </div>
        <CatalogProducts
          filters={filters}
          blockTitle={params.name as string ?? 'Акції'}
        />
      </div>
    </HydrationBoundary>
  )
}

export default CatalogPage
