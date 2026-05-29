import { Suspense } from "react"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import Header from "@/components/layout/header"
import CategoriesNavList from "@/components/categories/categories-nav-list"
import Footer from "@/components/layout/footer"
import { fetchCategories } from "@/services/category.service"
import { fetchCompanyInfo } from "@/services/company.service"
import { CATEGORIES_QUERY_KEY } from "@/hooks/queries/use-categories"
import { COMPANY_INFO_QUERY_KEY } from "@/hooks/queries/use-company";
import { Toaster } from "@/components/ui/sonner"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()

    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: CATEGORIES_QUERY_KEY,
        queryFn: fetchCategories,
      }),
      queryClient.prefetchQuery({
        queryKey: COMPANY_INFO_QUERY_KEY,
        queryFn: fetchCompanyInfo,
      }),
    ])


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-auto">
          <div className="container mx-auto mb-2">
            <Suspense>
              <CategoriesNavList />
            </Suspense>
          </div>
          {children}
        </main>
        <Footer />
      </div>
      <Toaster  position="top-right" />
    </HydrationBoundary>
  )
}

export default MainLayout
