import { ProductPage as ProductPageType } from "@/lib/types";
import Button from "../button";
import { Input } from "../ui/input";
import { useCartStore } from "@/context/cart-store-provider";
import { useCallback, useEffect } from "react";

export default function ProductPageItemDesc({
    product,
}: {
    product: ProductPageType;
}) {
    const { decrement, quantity, increment, setQuantity, addToCart } =
        useCartStore((state) => state);

    useEffect(() => {
        setQuantity(product.title, 0);
    }, []);

    const handleIncrement = useCallback(() => {
        const productItem = {
            name: product.title,
            price: product.price,
            quantity: 1,
            images: { mobile: product.images.mobile },
        };
        increment(productItem);
    }, [product, increment]);

    const handleQuantityChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (value === "") {
                setQuantity(product.title, 0);
                return;
            }

            const parsedValue = parseInt(value);
            if (!isNaN(parsedValue) && parsedValue > 0) {
                setQuantity(product.title, parsedValue);
            }
        },
        [product.title, setQuantity]
    );

    const handleAddToCart = useCallback(() => {
        const productItem = {
            name: product.title,
            price: product.price,
            quantity: quantity,
            images: { mobile: product.images.mobile },
        };
        addToCart(productItem);
    }, [product, quantity, addToCart]);

    return (
        <article className="flex flex-col gap-6 md:w-1/2 md:justify-center md:gap-8 ">
            {product.new && (
                <span className="overline uppercase text-(--color-orange-primary)">
                    new product
                </span>
            )}
            <h4 className="md:w-1/2 w-full lg:w-2/3">{product.title}</h4>
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
    );
}
