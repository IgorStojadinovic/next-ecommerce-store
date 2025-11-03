import Link from "next/link";
import Button from "../../shared/button";
import Image from "next/image";
export default function SpeakerZX9() {
    return (
        <section className="py-14 px-6 bg-(--color-orange-primary) rounded-lg  text-white text-center relative flex flex-col items-center justify-center xl:flex-row w-full  xl:pb-0 xl:pt-[130px] xl:gap-28 ">
            <Image
                src="/assets/home/mobile/pattern-circles.svg"
                alt="Speaker ZX9"
                width={558}
                height={558}
                className="absolute top-0  md:hidden"
            />
            <Image
                src="/assets/home/tablet/pattern-circles.svg"
                alt="Speaker ZX9"
                width={944}
                height={994}
                className="absolute top-0  hidden md:block xl:hidden"
            />
            <Image
                src="/assets/home/desktop/pattern-circles.svg"
                alt="Speaker ZX9"
                width={944}
                height={994}
                className="absolute top-0 left-0 hidden xl:block"
            />
            <picture className="flex justify-center items-end mb-8 md:mb-16 xl:mb-0 z-10">
                <source
                    media="(min-width: 1024px)"
                    srcSet="/assets/home/desktop/image-speaker-zx9.png"
                />
                <source
                    media="(min-width: 768px)"
                    srcSet="/assets/home/tablet/image-speaker-zx9.png"
                />
                <img
                    src="/assets/home/mobile/image-speaker-zx9.png"
                    alt="Speaker ZX9"
                    className="h-[207px] w-[172px] md:h-[237px] md:w-[197px] xl:h-auto xl:w-auto "
                />
            </picture>
            <article className="flex flex-col items-center justify-center gap-6 md:w-1/2 xl:w-1/4">
                <h2 className="hidden md:hidden">ZX9 Speaker</h2>
                <h1 className="hidden md:block">ZX9 Speaker</h1>
                <p className="opacity-75 font-medium">
                    Upgrade to premium speakers that are phenomenally built to
                    deliver truly remarkable sound.
                </p>
                <Link href="/products/speakers/zx9">
                    <Button type="dark" className="md:mt-4">
                        see product
                    </Button>
                </Link>
            </article>
        </section>
    );
}
