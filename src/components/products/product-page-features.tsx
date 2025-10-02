import { ProductPage as ProductPageType } from "@/lib/types";

export default function ProductPageFeatures({ product }: { product: ProductPageType }) {
    return (
      <article className="flex flex-col gap-6 lg:w-2/3">
      <h5 className="font-bold">Features</h5>
      <div className="flex flex-col gap-4 opacity-50 ">
          {product.features.map((feature) => (
              <p key={feature}>{feature}</p>
          ))}
      </div>
  </article>
    );
}