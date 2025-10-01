import Link from "next/link";
import Button from "./button";
export default function SpeakerZX7() {
    return (
        <section className="flex flex-col items-center justify-center rounded-lg text-center text-black relative w-full">
            <picture className="w-full">
                <source
                    media="(min-width: 1024px)"
                    srcSet="/assets/home/desktop/image-speaker-zx7.jpg"
                />
                <source
                    media="(min-width: 768px)"
                    srcSet="/assets/home/tablet/image-speaker-zx7.jpg"
                />
                <img
                    src="/assets/home/mobile/image-speaker-zx7.jpg"
                    alt="Speaker ZX7"
                    className="rounded-lg w-full h-full object-contain"
                />
            </picture>
            <article className="flex flex-col items-start justify-center gap-6 text-black z-10 absolute top-0 h-full w-full px-6 md:px-16 xl:px-24">
                <h4>ZX7 Speaker</h4>
                <Link href="/products/speakers/zx7">
                    <Button type="ghost">see product</Button>
                </Link>
            </article>
        </section>
    );
}
