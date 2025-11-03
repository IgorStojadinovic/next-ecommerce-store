"use client";
import ProductList from "../components/shared/product-list";
import SpeakerZX9 from "../components/home/featured-products/speaker-zx9";
import SpeakerZX7 from "../components/home/featured-products/speaker-zx7";
import EarphonesYX1 from "../components/home/featured-products/earphones-yx1";
import CTA from "../components/cta";
import HeroSection from "../components/home/hero-section/hero-section";
import Container from "../components/layout/container";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollSmoother from "gsap/dist/ScrollSmoother";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export default function Home() {
    useGSAP(() => {
        const smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.5,
            effects: true,
            smoothTouch: 1.5,
        });
        return () => {
            smoother.kill();
        };
    }, []);

    return (
        <>
            <HeroSection />
            <Container>
                <ProductList />
                <section className="flex flex-col items-center justify-center gap-6 pt-24 md:gap-8 xl:pt-40 xl:gap-10">
                    <SpeakerZX9 />
                    <SpeakerZX7 />
                    <EarphonesYX1 />
                </section>
                <CTA />
            </Container>
        </>
    );
}
