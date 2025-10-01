"use client";
import { useCartStore } from "@/context/cart-store-provider";
import Image from "next/image";
export default function CheckoutCart() {
    const cart = useCartStore((state) => state.cart);

    return (
        <>
            {cart.length > 0 ? (
                <ul className="flex flex-col gap-6 ">
                    {cart.map((item) => (
                        <li
                            key={item.name}
                            className="flex  items-center justify-between gap-4 last:pb-8"
                        >
                            <Image
                                src={item.images.mobile}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="rounded-md"
                            />
                            <div className="flex flex-1 justify-between  gap-4">
                                <div>
                                    <p className="text-sm font-bold">
                                        {item.name}
                                    </p>
                                    <p className="text-sm font-bold text-black/50 pt-1">
                                        $ s {item.price * item.quantity}
                                    </p>
                                </div>

                                <p className="text-sm font-bold text-black/50">
                                    x{item.quantity}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <ul className="flex flex-col gap-6 ">
                    <li className="flex items-center justify-between gap-4 last:pb-8 animate-pulse">
                        <div className="h-16 w-16 rounded-full bg-black/5"></div>
                        <div className="flex flex-1 justify-between  gap-4">
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-bold w-32  h-2 rounded-full bg-black/5"></p>
                                <p className="text-sm font-bold text-black/50 pt-1 w-28 h-2 rounded-full bg-black/5"></p>
                            </div>
                            <p className="text-sm font-bold text-black/50 w-8 h-2 rounded-full bg-black/5"></p>
                        </div>
                    </li>
                </ul>
            )}
        </>
    );
}
