import { buildQuery } from "@/lib/build-query"
import type { IProductDTO } from "@/types/dto/product.dto"

export function getProductUrl(product: IProductDTO): string {
  const id = product._id ?? product.id
  const params = buildQuery({
    categoryId: product.categoryId,
    categoryName: product.categoryName,
    productName: product.title,
  })
  return `/product/${id}${params}`
}
