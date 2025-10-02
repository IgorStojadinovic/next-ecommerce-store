import { ProductPage as ProductPageType } from "@/lib/types";
export default function ProductPageGallery({ product }: { product: ProductPageType }) {
    return (
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
    );
}