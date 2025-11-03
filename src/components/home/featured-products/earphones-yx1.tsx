import Link from "next/link";
import Button from "../../shared/button";

export default function EarphonesYX1() {
    return (
        <section className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-3 md:min-h-[320px] xl:w-full xl:gap-10">
            <picture className="md:w-1/2 xl:full">
                <source
                    media="(min-width: 1024px)"
                    srcSet="/assets/home/desktop/image-earphones-yx1.jpg"
                />
                <source
                    media="(min-width: 768px)"
                    srcSet="/assets/home/tablet/image-earphones-yx1.jpg"
                />
                <img
                    src="/assets/home/mobile/image-earphones-yx1.jpg"
                    alt="Earphones YX1"
                    className="rounded-lg w-full h-full object-contain"
                />
            </picture>
            <article className="flex flex-col items-start justify-center gap-6 text-black bg-(--color-gray) rounded-lg w-full px-6 py-11 md:w-1/2 md:px-10 md:min-h-[320px] xl:px-24 xl:py-37 ">
                <h4>YX1 Earphones</h4>
                <Link href="/products/earphones/wireless-earphones-y1">
                    <Button type="ghost">see product</Button>
                </Link>
            </article>
        </section>
    );
}
