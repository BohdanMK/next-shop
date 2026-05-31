export const ROUTES = {
  home: '/',
  aboutUs: '/about-us',
  promotions: '/promotions',
  contacts: '/contacts',

  catalog: '/catalog',
  catalogOnSale: '/catalog?isOnSale=true',
  catalogCategory: (categoryId: string, name: string) =>
    `/catalog?categoryId=${categoryId}&name=${name}`,
  catalogSubCategory: (categoryId: string, name: string, subCategoryId: string) =>
    `/catalog?categoryId=${categoryId}&name=${name}&subCategoryId=${subCategoryId}`,

  product: (id: string) => `/product/${id}`,
  checkout: '/checkout',
  checkoutSuccess: (id: string) => `/checkout/success/${id}`,
}
