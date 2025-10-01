import ProductItem from "@/components/products/product-item";
import { HeadphoneItems } from "@/lib/product-items";
import ProductList from "@/components/product-list";
import CTA from "@/components/cta";
import PageHeader from "@/components/products/page-header";

export default function Headphones() {
    return (
        <>
            <PageHeader title="headphones" />
            <section className="px-6 md:px-10 xl:px-[256px]">
                {Object.values(HeadphoneItems).map((product, index) => (
                    <ProductItem
                        key={product.name}
                        product={product}
                        className={index % 2 ? "lg:flex-row-reverse" : ""}
                    />
                ))}
                <ProductList />
                <CTA />
            </section>
        </>
    );
}
