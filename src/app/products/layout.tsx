"use client";
import { DesktopNavbar, MobileNavbar } from "@/components/navbar";
import Container from "@/components/container";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollSmoother from "gsap/dist/ScrollSmoother";
import ScrollTrigger from "gsap/dist/ScrollTrigger";


gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useGSAP(() => {
        const smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1,
            effects: true,
            smoothTouch: 1,
        });
        return () => {
            smoother.kill();
        };
    }, []);
    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">
                <MobileNavbar className="bg-black relative border-none" />
                <Container className="bg-black">
                    <DesktopNavbar />
                </Container>

                {children}
            </div>
        </div>
    );
}
