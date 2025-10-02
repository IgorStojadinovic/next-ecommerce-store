"use client";
import { ProductPage as ProductPageType } from "@/lib/types";
import Link from "next/link";
import Recomended from "../recomended";
import CTA from "../cta";
import ProductPageImage from "./product-page-image";
import ProductPageItemDesc from "./product-page-item-desc";
import ProductPageFeatures from "./product-page-features";
import ProductPageInBox from "./product-page-in-box";
import ProductPageGallery from "./product-page-gallery";
export default function ProductPageSkeleton({
    product,
}: {
    product: ProductPageType;
}) {
    return (
        <div className="px-6 md:px-10 xl:px-[256px]">
            <div className="py-6 md:pt-8 md:pb-6 lg:pt-20 lg:pb-14">
                <Link href={product.href} className="text-black/50 font-medium">
                    Go Back
                </Link>
            </div>
            {/** Image and Item Description */}
            <section className="flex flex-col gap-8 md:flex-row md:gap-16 xl:gap-32">
                <ProductPageImage image={product.images} />
                <ProductPageItemDesc product={product} />
            </section>
            {/** Features and In the box */}
            <section className="flex flex-col gap-20 py-20 lg:flex-row lg:gap-32 lg:py-40 ">
                <ProductPageFeatures product={product} />
                <ProductPageInBox product={product} />
            </section>
            {/** Gallery */}
            <section className="pb-32 lg:pb-40">
                <ProductPageGallery product={product} />
            </section>
            {/** Recomended */}
            <Recomended recomendations={product.recomendations} />
            <CTA />
        </div>
    );
}
