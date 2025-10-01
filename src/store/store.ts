import { CartItem } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartStore = {
    cart: CartItem[];
    quantity: number;
    prices: {
        [key: string]: number;
    };
};

export type cartActions = {
    addToCart: (product: CartItem) => void;
    removeFromCart: (product: CartItem) => void;
    increment: (product: CartItem) => void;
    decrement: (product: CartItem) => void;
    clearCart: () => void;
    setQuantity: (name: string, quantity: number) => void;
};

export type cartStore = CartStore & cartActions;

export const useStore = create<cartStore>()(
    persist(
        (set) => ({
            cart: [],
            quantity: 1,
            prices: {
                "XX99 Mark II Headphones": 2999,
                "XX99 Mark I Headphones": 1750,
                "XX59 Headphones": 899,
                "ZX9 Speaker": 4500,
                "ZX7 Speaker": 3500,
                "YX1 Wireless Earphones": 599,
            },
            addToCart: (product) =>
                set((state) => {
                    const existingItem = state.cart.find(
                        (item) => item.name === product.name
                    );

                    if (existingItem) {
                        return {
                            cart: state.cart.map((item) =>
                                item.name === product.name
                                    ? {
                                          ...item,
                                          quantity:
                                              item.quantity + product.quantity,
                                          price:
                                              item.price +
                                              product.price * product.quantity,
                                      }
                                    : item
                            ),
                        };
                    } else {
                        return {
                            cart: [
                                ...state.cart,
                                {
                                    ...product,
                                    quantity: product.quantity,
                                    price: product.price * product.quantity,
                                },
                            ],
                        };
                    }
                }),

            removeFromCart: (product) =>
                set((state) => ({
                    cart: state.cart.filter(
                        (item) => item.name !== product.name
                    ),
                })),

            clearCart: () => set({ cart: [] }),

            increment: (product) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.name === product.name
                            ? {
                                  ...item,
                                  quantity: item.quantity + 1,
                                  price: item.price + state.prices[item.name],
                              }
                            : item
                    ),
                    quantity: state.quantity + 1,
                })),

            decrement: (product) =>
                set((state) => ({
                    cart: state.cart
                        .map((item) =>
                            item.name === product.name
                                ? {
                                      ...item,
                                      quantity: item.quantity - 1,
                                      price:
                                          item.price - state.prices[item.name],
                                  }
                                : item
                        )
                        .filter((item) => item.quantity > 0),

                    quantity: state.quantity - 1 > 0 ? state.quantity - 1 : 0,
                })),
            setQuantity: (name, quantity) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.name === name
                            ? {
                                  ...item,
                                  quantity: quantity,
                                  price: state.prices[name] * quantity,
                              }
                            : item
                    ),
                    quantity: quantity > 0 ? quantity : 0,
                })),
        }),
        {
            name: "cart",

            onRehydrateStorage: () => (state) => {
                if (state?.cart) {
                    state.cart = state.cart;
                }
            },
            partialize: (state) => ({
                cart: state.cart,
            }),
        }
    )
);
