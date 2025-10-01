import ProductItem from "@/components/products/product-item";
import { EarphoneItems } from "@/lib/product-items";
import ProductList from "@/components/product-list";
import CTA from "@/components/cta";
import PageHeader from "@/components/products/page-header";

export default function EarphonesPage() {
    return (
        <>
            <PageHeader title="earphones" />
            <section className="px-6 md:px-10 xl:px-[256px]">
                {Object.values(EarphoneItems).map((product) => (
                    <ProductItem key={product.name} product={product} />
                ))}
                <ProductList />
                <CTA />
            </section>
        </>
    );
}
