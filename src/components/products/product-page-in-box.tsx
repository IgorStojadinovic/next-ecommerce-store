import { ProductPage as ProductPageType } from "@/lib/types";
export default function ProductPageInBox({ product }: { product: ProductPageType }) {
    return (
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
    );
}