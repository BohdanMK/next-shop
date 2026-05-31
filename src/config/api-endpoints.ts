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
  cart: {
    list: "/api/cart",
    addItem: "/api/cart/add",
    increase: "/api/cart/item/increase",
    decrease: "/api/cart/item/decrease",
    deleteItem: "/api/cart/item/delete",
  },
  orders: {
    create: "/api/order/create",
  },
} as const
