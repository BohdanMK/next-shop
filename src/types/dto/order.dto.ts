export interface OrderDTO {
    _id?: string;
    cartId?: string;
    name: string;
    phone: string;
    street?: string;
    house?: string;
    cityId?: string;
    cityName?: string;
    deliveryType: 'pickup' | 'delivery';
    deliveryTime: 'in_time' | 'nearest_time';
    date?: Date | string;
    time?: string;
    birthdayDiscount: boolean;
    comment?: string;
    valuePerson: number;
    agreePolicy: boolean;
}
