import { Recomendation } from "./recomendations";

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
    cardNumber: string;
    cardPin: string;
};
