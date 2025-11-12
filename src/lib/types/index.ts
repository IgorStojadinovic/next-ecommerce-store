import { Recomendation } from "@/lib/data/recomendations";

export type ProductItem = {
    name: string;
    description: string;
    price: number;
    new: boolean;
    images: {
        mobile: string;
        tablet: string;
        desktop: string;
    };
    href: string;
};

export type ProductPage = {
    title: string;
    description: string;
    price: number;
    new: boolean;
    href: string;
    images: {
        mobile: string;
        tablet: string;
        desktop: string;
    };
    features: string[];
    includes: string[];
    gallery: {
        first: {
            mobile: string;
            tablet: string;
            desktop: string;
        };
        second: {
            mobile: string;
            tablet: string;
            desktop: string;
        };
        third: {
            mobile: string;
            tablet: string;
            desktop: string;
        };
    };
    recomendations: Recomendation[];
};

export type CartItem = {
    name: string;
    price: number;
    quantity: number;
    images: {
        mobile: string;
        tablet: string;
        desktop: string;
    };
};

export type CheckoutFormValues = {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
    state: string;
    paymentMethod: string;
};

export type LoginFormValues = {
    email: string;
    password: string;
};

export type User = {
    email: string;
    name: string;
    address: string;
    phone: string;
    zip: string;
    city: string;
    state: string;
};

export type OrderCreatePayload = {
    cartItems: CartItem[];
    formData: CheckoutFormValues;
};

export type OrderResponse = {
    success: boolean;
    order: {
        id: number;
        totalAmount: string;
        itemCount: number;
        createdAt: Date;
    };
};
