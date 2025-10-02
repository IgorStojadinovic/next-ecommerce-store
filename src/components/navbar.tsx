"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartModal from "./cart/cartmodal";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import NavbarList from "./navbar-list";
export function MobileNavbar({ className }: { className?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header>
            <nav
                className={cn(
                    "z-20 py-8 flex justify-between items-center absolute md:border-b-[1px] md:border-(--color-gray)/50  w-full px-6 md:px-10  xl:px-24 lg:hidden",
                    className
                )}
            >
                <div className={cn("flex md:items-center gap-10  flex-1")}>
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger>
                            <Image
                                src={"/assets/menu.svg"}
                                alt="logo"
                                width={16}
                                height={25}
                                className="cursor-pointer"
                            />
                        </SheetTrigger>
                        <SheetContent side="right" className="mt-[89px]">
                            <SheetHeader className="absolute ">
                                <SheetTitle className="hidden"></SheetTitle>
                            </SheetHeader>
                            <NavbarList setIsOpen={setIsOpen} />
                        </SheetContent>
                    </Sheet>

                    <Image
                        src={"/assets/audiophile-logo.svg"}
                        alt="logo"
                        width={143}
                        height={25}
                        className=" h-[25px] justify-self-center  w-full md:w-auto"
                    />
                </div>

                <CartModal />
            </nav>
        </header>
    );
}

export function DesktopNavbar({ className }: { className?: string }) {
    const currentPath = usePathname();
    return (
        <nav
            className={cn(
                "z-20 justify-between items-center w-full text-white hidden lg:flex  ",
                className
            )}
        >
            <div className="flex items-center justify-between w-full md:border-b-[0.5px] md:border-(--color-gray)/50   py-8">
                <Link href="/">
                    <Image
                        src={"/assets/audiophile-logo.svg"}
                        alt="logo"
                        width={143}
                        height={25}
                        className=" h-[25px]  "
                    />
                </Link>

                <ul className="flex flex-1 justify-center items-center gap-9 uppercase font-bold">
                    <li>
                        <Link
                            href="/"
                            className={
                                currentPath === "/"
                                    ? "text-(--color-orange-primary)"
                                    : "hover:text-(--color-orange-primary) transition-colors duration-300"
                            }
                        >
                            home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/products/headphones"
                            className={
                                currentPath.includes("/products/headphones") ||
                                currentPath.includes("/products/headphones/xx59") ||
                                currentPath.includes("/products/headphones/xx99")
                                    ? "text-(--color-orange-primary)"
                                    : "hover:text-(--color-orange-primary) transition-colors duration-300"
                            }
                        >
                            headphones
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/products/speakers"
                            className={
                                currentPath.includes("/products/speakers") ||
                                currentPath.includes(
                                    "/products/speakers/zx9"
                                ) ||
                                currentPath.includes("/products/speakers/zx7")
                                    ? "text-(--color-orange-primary)"
                                    : "hover:text-(--color-orange-primary) transition-colors duration-300"
                            }
                        >
                            speakers
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/products/earphones"
                            className={
                                currentPath.includes("/products/earphones") ||
                                currentPath.includes("/products/earphones/yx1")
                                    ? "text-(--color-orange-primary)"
                                    : "hover:text-(--color-orange-primary) transition-colors duration-300"
                            }
                        >
                            earphones
                        </Link>
                    </li>
                </ul>

                <CartModal />
            </div>
        </nav>
    );
}
