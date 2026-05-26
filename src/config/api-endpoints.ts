export const API_ENDPOINTS = {
  categories: {
    list: "/api/categories",
    subCategories: (id: number | string) => `/api/categories/${id}/subCategories`,
  },
  companyInfo : {
    list: "/api/company-info",
  },
  products: {
    list: "/api/products",
  },
} as const
