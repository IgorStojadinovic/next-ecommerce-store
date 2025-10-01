"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Button from "../button";
import { useStore } from "@/store/store";
import Link from "next/link";
import { useState } from "react";
export default function CartModal() {
    const { cart, setQuantity, increment, decrement, clearCart } = useStore();

    const handleQuantityChange = (
        itemName: string,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;

        if (value === "") {
            setQuantity(itemName, 0);
            return;
        }

        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue) && parsedValue > 0) {
            setQuantity(itemName, parsedValue);
        }
    };
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="relative flex items-center justify-center">
                {cart.length > 0 && (
                    <span className="absolute flex size-3 top-[-5px] right-[-10px]">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--color-orange-primary) opacity-75"></span>
                        <span className="relative inline-flex size-3  rounded-full bg-(--color-orange-primary) z-10"></span>
                    </span>
                )}
                <Image
                    src={"/assets/cart-icon.svg"}
                    alt="logo"
                    width={23}
                    height={25}
                    className="cursor-pointer "
                />
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-8">
                <DialogHeader className="flex-row items-center justify-between pt-8">
                    <DialogTitle>
                        Cart {cart.length > 0 ? `(${cart.length})` : ""}
                    </DialogTitle>
                    <p
                        className="text-sm text-black/50 underline cursor-pointer"
                        onClick={clearCart}
                    >
                        Remove all
                    </p>
                </DialogHeader>
                {cart.length > 0 ? (
                    <ul className="flex flex-col gap-4">
                        {cart.map((item) => (
                            <li
                                className="flex items-center justify-between gap-4"
                                key={item.name}
                            >
                                <Image
                                    src={item.images.mobile}
                                    alt="logo"
                                    width={64}
                                    height={64}
                                    className="rounded-lg"
                                />
                                <div className="flex-1">
                                    <p className="text-sm font-bold uppercase">
                                        {item.name}
                                    </p>
                                    <p className="text-sm font-bold text-black/50">
                                        ${item.price}
                                    </p>
                                </div>

                                <div className="flex gap-4 h-[32px]">
                                    <div className="bg-(--color-gray) w-[120px] flex items-center justify-between">
                                        <Button
                                            type="cart"
                                            className="flex-1 h-full"
                                            onClick={() => decrement(item)}
                                        >
                                            -
                                        </Button>
                                        <Input
                                            type="text"
                                            className="p-0 text-center flex-1 text-sm w-[50px] h-full"
                                            placeholder="1"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleQuantityChange(
                                                    item.name,
                                                    e
                                                )
                                            }
                                        />
                                        <Button
                                            type="cart"
                                            className="flex-1 h-full"
                                            onClick={() => increment(item)}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-sm text-black/50">
                            No items in cart
                        </p>
                    </div>
                )}

                <div className="flex items-center justify-between gap-4">
                    <p className="text-sm  uppercase text-black/50">Total</p>
                    <p className="text-sm font-bold ">
                        ${cart.reduce((acc, item) => acc + item.price, 0)}
                    </p>
                </div>
                <Link href="/checkout">
                    <Button type="primary" className="w-full" onClick={() => setIsOpen(false)}>
                        Checkout
                    </Button>
                </Link>
            </DialogContent>
        </Dialog>
    );
}
