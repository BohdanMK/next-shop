// shared/dto/cart.ts
import type { ImageDTO, PriceDTO, ProductComponentDTO } from './product.dto';

export interface CartItemOptions {
    id: string;
    label: string;
    extraPrice?: {
        amount: number;
        currency: 'UAH';
    };
    components?: ProductComponentDTO[];
}

export interface CartItemDTO {
    _id?: string;
    productId: string;
    slug?: string;
    title: string;
    image: ImageDTO;
    price: PriceDTO;
    salePrice?: number;
    selectedOptions?: CartItemOptions[];
    quantity: number;
}

export interface CartDTO {
    id: string;
    items: CartItemDTO[];
    totalPrice: number;
}

export interface AddToCartBody {
    productId: string;
    quantity: number;
    selectedOptions: CartItemOptions[];
}