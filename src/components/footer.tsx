"use client";
import Image from "next/image";
import Link from "next/link";
import SocialLinks from "./socal-links";
import { usePathname } from "next/navigation";
export default function Footer() {
    const currentPath = usePathname();
    return (
        <footer className="flex flex-col items-center justify-center gap-12 bg-(--color-black) text-white text-center px-6 pt-14 pb-8 md:justify-start md:items-start md:px-10 md:pt-16 md:pb-12 xl:px-[256px] relative">
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between md:w-full">
                <Image
                    src={"/assets/audiophile-logo.svg"}
                    alt="logo"
                    width={143}
                    height={25}
                />
                <ul className="flex flex-col items-center justify-center gap-6 uppercase font-bold md:flex-row">
                    <li>
                        <Link href="/" className={currentPath === "/" ? "text-(--color-orange-primary)" : "hover:text-(--color-orange-primary)"}>home</Link>
                    </li>
                    <li>
                        <Link href="/products/headphones" className={currentPath === "/products/headphones" ? "text-(--color-orange-primary)" : "hover:text-(--color-orange-primary)"}>headphones</Link>
                    </li>
                    <li>
                        <Link href="/products/speakers" className={currentPath === "/products/speakers" ? "text-(--color-orange-primary)" : "hover:text-(--color-orange-primary)"}>speakers</Link>
                    </li>
                    <li>
                        <Link href="/products/earphones" className={currentPath === "/products/earphones" ? "text-(--color-orange-primary)" : "hover:text-(--color-orange-primary)"}>earphones</Link>
                    </li>
                </ul>
            </div>
            <div className="lg:flex lg:justify-between lg:items-end lg:w-full">
                <p className="opacity-50 md:text-left lg:w-2/5">
                    Audiophile is an all in one stop to fulfill your audio needs.
                    We&apos;re a small team of music lovers and sound specialists
                    who are devoted to helping you get the most out of personal
                    audio. Come and visit our demo facility - we’re open 7 days a
                    week.
                </p>
                <SocialLinks className="lg:flex hidden" />
            </div>
            <div className="md:flex md:justify-between md:items-center md:w-full">
                <p className="opacity-50 ">
                    Copyright 2025. All Rights Reserved
                </p>
                <SocialLinks className="lg:hidden mt-5" />
            </div>
            <div className="h-1 w-[100px] bg-amber-700 absolute top-0 left-6 xl:left-[256px] md:left-10"/>
        </footer>
    );
}
