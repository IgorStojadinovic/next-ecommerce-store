import Button from "../button";
import { type ProductItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ProductItem({
    product,
    className,
}: {
    product: ProductItem;
    className?: string;
}) {
    return (
        <section
            className={cn(
                "flex flex-col items-center justify-center gap-6 pt-24 md:gap-8 xl:pt-40  lg:flex-row lg:gap-32",
                className
            )}
        >
            <picture className="lg:w-1/2 lg:rounded-lg">
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
                    alt="Product"
                    className="lg:rounded-lg"
                />
            </picture>
            <article className="flex flex-col items-center justify-center gap-6 text-center lg:w-1/2 lg:items-start lg:text-left">
                <span className="uppercase tracking-[10px] text-(--color-orange-primary)">
                    {product.new ? "new product" : ""}
                </span>
                <h2 className="lg:w-1/2">{product.name}</h2>
                <p className="opacity-50 md:px-[60px] lg:px-0 lg:w-2/3">
                    {product.description}
                </p>
                <Link href={product.href}>
                    <Button type="primary">see product</Button>
                </Link>
            </article>
        </section>
    );
}
