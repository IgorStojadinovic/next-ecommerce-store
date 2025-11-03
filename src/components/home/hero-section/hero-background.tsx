import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroBackgorund() {
    useGSAP(() => {
        gsap.fromTo(
            ".hero-image",
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 1,
                ease: "power2.inOut",
            }
        );
    });
    return (
        <picture className="-z-10">
            <source
                media="(min-width: 1024px)"
                srcSet="/assets/home/desktop/image-hero.jpg"
            />
            <source
                media="(min-width: 768px)"
                srcSet="/assets/home/tablet/image-header.jpg"
            />
            <img
                src="/assets/home/mobile/image-header.jpg"
                alt="XX99 Mark II Headphones hero image"
                className="hero-image"
            />
        </picture>
    );
}
