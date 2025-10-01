export default function CTA() {
    return (
        <section className="text-center my-[120px] lg:flex flex-row-reverse justify-between xl:gap-[125px] lg:gap-10">
            <picture>
                <source
                    media="(min-width: 1024px)"
                    srcSet="/assets/shared/desktop/image-best-gear.jpg"
                />
                <source
                    media="(min-width: 768px)"
                    srcSet="/assets/shared/tablet/image-best-gear.jpg"
                />
                <img
                    src="/assets/shared/mobile/image-best-gear.jpg"
                    alt="Best Gear"
                    className="rounded-lg mb-10  lg:h-full lg:object-cover lg:mb-0"
                />
            </picture>
            <div className="md:px-16 lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:text-left lg:px-0">
                <h4 className="md:text-[40px] xl:w-4/6 lg:w-full">
                    Bringing you the{" "}
                    <span className="text-(--color-orange-primary)">best</span>{" "}
                    audio gear
                </h4>
                <p className="opacity-50 mt-8 xl:w-[72%] lg:w-full">
                    Located at the heart of New York City, Audiophile is the
                    premier store for high end headphones, earphones, speakers,
                    and audio accessories. We have a large showroom and luxury
                    demonstration rooms available for you to browse and
                    experience a wide range of our products. Stop by our store
                    to meet some of the fantastic people who make Audiophile the
                    best place to buy your portable audio equipment.
                </p>
            </div>
        </section>
    );
}
