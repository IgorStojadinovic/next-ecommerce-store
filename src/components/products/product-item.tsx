import Button from "../button";
import { type ProductItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getImageProps } from "next/image";
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
            <div className="lg:w-1/2 w-full">
                {(() => {
                    const common = { alt: product.name, sizes: "100vw" };

                    const {
                        props: { srcSet: desktop },
                    } = getImageProps({
                        ...common,
                        width: 1080,
                        height: 1120,
                        quality: 100,
                        src: product.images.desktop,
                    });

                    const {
                        props: { srcSet: tablet },
                    } = getImageProps({
                        ...common,
                        width: 768,
                        height: 800,
                        quality: 100,
                        src: product.images.tablet,
                    });

                    const {
                        props: { srcSet: mobile, ...rest },
                    } = getImageProps({
                        ...common,
                        width: 375,
                        height: 390,
                        quality: 100,
                        src: product.images.mobile,
                    });

                    return (
                        <picture>
                            <source
                                media="(min-width: 1024px)"
                                srcSet={desktop}
                            />
                            <source
                                media="(min-width: 768px)"
                                srcSet={tablet}
                            />
                            <img
                                {...rest}
                                className="w-full h-auto lg:rounded-lg"
                                alt={product.name}
                            />
                        </picture>
                    );
                })()}
            </div>
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
