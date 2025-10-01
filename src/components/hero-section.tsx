"use client";
import Button from "./button";
import HeroBackgorund from "./hero-background";
import { DesktopNavbar } from "./navbar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function HeroSection() {
    const articleRef = useRef<HTMLDivElement>(null);
    useGSAP(
        () => {
            gsap.fromTo(
                articleRef.current,
                {
                    opacity: 0,
                    x: -100,
                    delay: 0.5,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    delay: 0.5,
                    ease: "power2.inOut",
                }
            );
        },
        { scope: articleRef }
    );

    return (
        <section className="overflow-hidden flex flex-col items-center justify-center h-[600px] relative z-10 md:min-h-[724px] xl:min-h-[729px] lg:items-start lg:bg-black/90 md:px-10 xl:px-[256px]">
            <DesktopNavbar />
            <article
                ref={articleRef}
                className="flex flex-col items-center justify-center h-full  w-full text-cente md:w-1/2 text-center lg:items-start lg:text-left lg:w-1/3 "
            >
                <span className="overline ">new product</span>
                <h2 className="text-white pb-6 md:hidden">
                    XX99 Mark II Headphones
                </h2>
                <h1 className="text-white pb-6 hidden md:block">
                    XX99 Mark II Headphones
                </h1>
                <p className="pb-10 text-white opacity-75 ">
                    Experience natural, lifelike audio and exceptional build
                    quality made for the passionate music enthusiast.
                </p>
                <Button type="primary">see product</Button>
            </article>
            <HeroBackgorund />
        </section>
    );
}
