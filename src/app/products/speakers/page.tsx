import ProductItem from "@/components/products/product-item";
import { SpeakerItems } from "@/lib/data/product-items";
import ProductList from "@/components/shared/product-list";
import CTA from "@/components/cta";
import PageHeader from "@/components/products/page-header";

export default function SpeakersPage() {
    return (
        <>
            <PageHeader title="speakers" />
            <section className="px-6 md:px-10 xl:px-[256px]">
                {Object.values(SpeakerItems).map((product, index) => (
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
