import { cache } from "react"
import type { Metadata } from "next"
import { fetchProduct } from "@/services/product.service"
import { ROUTES } from "@/config/routes"
import ProductPageContent from "@/components/product/product-page-content"
import BreadCrumbsList from "@/components/shared/bread-crumbs-list"

const getProduct = cache(fetchProduct)

interface ProductPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ categoryId?: string; categoryName?: string; productName?: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)

  return {
    title: product.title,
    description: `${product.title} — ${product.weightGrams}г`,
    openGraph: {
      title: product.title,
      images: [product.image.src],
    },
  }
}

const Product = async ({ params, searchParams }: ProductPageProps) => {
  const { id } = await params
  const { categoryId, categoryName, productName } = await searchParams

  const breadcrumbs = [
    { name: 'Головна', href: ROUTES.home },
    ...(categoryId && categoryName
      ? [{ name: categoryName, href: ROUTES.catalogCategory(categoryId, categoryName) }]
      : []
    ),
    ...(productName ? [{ name: productName }] : []),
  ]

  return (
    <div className="container mx-auto">
      <BreadCrumbsList list={breadcrumbs} />
      <ProductPageContent productId={id} />
    </div>
  )
}

export default Product