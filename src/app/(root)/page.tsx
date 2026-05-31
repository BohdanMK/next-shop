import { getTranslations } from "next-intl/server"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import SliderBlock from "@/components/home-slider/slider-block"
import { fetchProducts } from "@/services/product.service"
import { PRODUCTS_QUERY_KEY } from "@/hooks/queries/use-product"
import ProductsSlider from "@/components/product/products-slider-wrapper"

const Home = async () => {
  const queryClient = new QueryClient()
  const t = await getTranslations('catalog')

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [PRODUCTS_QUERY_KEY, { isOnSale: true }],
      queryFn: () => fetchProducts({ isOnSale: true, limit: 100 }),
    }),
    queryClient.prefetchQuery({
      queryKey: [PRODUCTS_QUERY_KEY],
      queryFn: () => fetchProducts({ categoryId: '69349b20ec4c5c7dfa00254d', limit: 100 }),
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <div className="mb-4">
          <SliderBlock />
        </div>
        <div className="mb-4">
          <ProductsSlider
            params={{ isOnSale: true }}
            showAllHref="/catalog?isOnSale=true"
            blockTitle={t('promotions')}
          />
        </div>
        <div>
          <ProductsSlider
            params={{ categoryId: '69349b20ec4c5c7dfa00254d' }}
            blockTitle={t('pizzas')}
          />
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default Home
