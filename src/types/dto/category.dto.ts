

export interface ICategoryInfoDTO {
    _id?: string,
    id: string
    title: string;
    pathName: string,
    image?: string
    subCategories?: ISubCategoriesDTO[]
}

export interface ISubCategoriesDTO {
    _id?: string,
    id: string
    title: string;
    pathName: string,
    parentCategory: string
}