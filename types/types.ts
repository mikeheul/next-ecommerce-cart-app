export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
}