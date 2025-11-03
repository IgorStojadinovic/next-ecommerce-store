"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import CartModal from "../../cart/cartmodal";
import LoginModal from "../../auth/login-modal";
import MobileSidebar from "./mobile-sidebar";
import AccountModal from "../../auth/account-dropdown";
import DesktopLinks from "./desktop-links";
import Container from "../container";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export function MobileNavbar({ className }: { className?: string }) {
    return (
        <nav
            className={cn(
                "z-20 py-8 flex justify-between items-center absolute md:border-b-[1px] md:border-(--color-gray)/50  w-full px-6 md:px-10  xl:px-24 lg:hidden ",
                className
            )}
        >
            <div className={cn("flex md:items-center gap-10  flex-1")}>
                <MobileSidebar />

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
    );
}

export function DesktopNavbar({ className }: { className?: string }) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const isProductsPage = pathname.includes("/products");

    return (
        <Container className={cn("bg-black/90", isProductsPage && "bg-black")}>
            <nav
                className={cn(
                    "z-20 justify-between items-center w-full text-white hidden lg:flex",
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
                            className="h-[25px]"
                        />
                    </Link>
                    <DesktopLinks />
                    <div className=" flex justify-center items-center gap-4">
                        {session ? <AccountModal /> : <LoginModal />}
                        <CartModal />
                    </div>
                </div>
            </nav>
        </Container>
    );
}
