import { ProductPage as ProductPageType } from "@/lib/types";

export default function ProductPageImage({ image }: { image: ProductPageType['images'] }) {
    return (
   
            <picture className="md:w-1/2 md:h-full w-full h-full lg:w-2/3">
                    <source
                        media="(min-width: 1024px)"
                        srcSet={image.desktop}
                    />
                    <source
                        media="(min-width: 768px)"
                        srcSet={image.tablet}
                    />
                    <img
                        src={image.mobile}
                        alt={image.mobile}
                        className="w-full h-full "
                    />
                </picture>
        
    );
}