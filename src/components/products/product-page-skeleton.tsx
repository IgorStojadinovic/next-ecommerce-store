"use client";
import { ProductPage as ProductPageType } from "@/lib/types";
import { Input } from "../ui/input";
import Link from "next/link";
import Button from "../button";
import { useStore } from "@/store/store";
import { useEffect } from "react";
export default function ProductPageSkeleton({
    product,
}: {
    product: ProductPageType;
}) {
    const { addToCart, quantity, increment, decrement, setQuantity } =
        useStore();

    useEffect(() => {
        setQuantity(product.title, 0);
    }, []);

    const handleIncrement = () => {
        const productItem = {
            name: product.title,
            price: product.price,
            quantity: 1,
            images: { mobile: product.images.mobile },
        };
        increment(productItem);
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "") {
            setQuantity(product.title, 0);
            return;
        }

        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue) && parsedValue > 0) {
            setQuantity(product.title, parsedValue);
        }
    };

    const handleAddToCart = () => {
        const productItem = {
            name: product.title,
            price: product.price,
            quantity: quantity,
            images: { mobile: product.images.mobile },
        };
        addToCart(productItem);
    };

    return (
        <div className="px-6 md:px-10 xl:px-[256px]">
            <div className="py-6 md:pt-8 md:pb-6 lg:pt-20 lg:pb-14">
                <Link href={product.href} className="text-black/50 font-medium">
                    Go Back
                </Link>
            </div>

            <section className="flex flex-col gap-8 md:flex-row md:gap-16 xl:gap-32">
                <picture className="md:w-1/2 md:h-full">
                    <source
                        media="(min-width: 1024px)"
                        srcSet={product.images.desktop}
                    />
                    <source
                        media="(min-width: 768px)"
                        srcSet={product.images.tablet}
                    />
                    <img
                        src={product.images.mobile}
                        alt={product.title}
                        className="w-full h-full "
                    />
                </picture>
                <article className="flex flex-col gap-6 md:w-1/2 md:justify-center md:gap-8">
                    {product.new && (
                        <span className="overline uppercase text-(--color-orange-primary)">
                            new product
                        </span>
                    )}
                    <h4 className="md:w-1/2">{product.title}</h4>
                    <p className="opacity-50 font-medium leading-[25px]">
                        {product.description}
                    </p>

                    <span className="font-bold text-lg">
                        $ {product.price.toLocaleString().replace(/,/g, ",")}
                    </span>

                    <div className="flex gap-4">
                        <div className="bg-(--color-gray) w-[120px] flex items-center justify-between">
                            <Button
                                type="cart"
                                className="flex-1 h-full"
                                onClick={() => {
                                    decrement({
                                        name: product.title,
                                        price: product.price,
                                        quantity: 1,
                                        images: {
                                            mobile: product.images.mobile,
                                        },
                                    });
                                }}
                            >
                                -
                            </Button>
                            <Input
                                type="text"
                                className="p-0 text-center flex-1 text-sm w-[50px] h-full"
                                placeholder="1"
                                value={quantity}
                                onChange={(e) => handleQuantityChange(e)}
                            />
                            <Button
                                type="cart"
                                className="flex-1 h-full"
                                onClick={() => {
                                    handleIncrement();
                                }}
                            >
                                +
                            </Button>
                        </div>
                        <Button
                            type="primary"
                            onClick={() => {
                                handleAddToCart();
                            }}
                        >
                            add to cart
                        </Button>
                    </div>
                </article>
            </section>
            {/** Features and In the box */}
            <section className="flex flex-col gap-20 py-20 lg:flex-row lg:gap-32 lg:py-40 ">
                <article className="flex flex-col gap-6 lg:w-2/3">
                    <h5 className="font-bold">Features</h5>
                    <div className="flex flex-col gap-4 opacity-50 ">
                        {product.features.map((feature) => (
                            <p key={feature}>{feature}</p>
                        ))}
                    </div>
                </article>
                <article className="flex flex-col gap-6 lg:w-1/3 md:flex-row md:gap-40 lg:flex-col lg:gap-6 ">
                    <h5 className="font-bold">In the box</h5>
                    <ul className="flex flex-col gap-2">
                        {product.includes.map((include) => (
                            <li key={include} className="flex gap-6">
                                <p className="font-bold text-(--color-orange-primary) text-sm">
                                    {include.split("x")[0]} x
                                </p>
                                <p className="opacity-50 font-medium  capitalize">
                                    {include.split("x")[1]}
                                </p>
                            </li>
                        ))}
                    </ul>
                </article>
            </section>

            {/** Gallery */}
            <section className="pb-32 lg:pb-40">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-7 md:grid-rows-2">
                    {Object.entries(product.gallery).map(
                        ([key, value], index) => (
                            <picture
                                key={key}
                                className={
                                    index === 2
                                        ? "md:col-[4/8] md:row-[1/3]"
                                        : index === 0
                                        ? "md:col-[1/4] md:row-[1/2]"
                                        : "md:col-[1/4] md:row-[2/3]"
                                }
                            >
                                <source
                                    media="(min-width: 1024px)"
                                    srcSet={value.desktop}
                                />
                                <source
                                    media="(min-width: 768px)"
                                    srcSet={value.tablet}
                                />
                                <img
                                    src={value.mobile}
                                    alt={value.mobile}
                                    className="rounded-lg w-full h-full object-cover md:rounded-md"
                                />
                            </picture>
                        )
                    )}
                </div>
            </section>
        </div>
    );
}
