"use client";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import NavbarList from "../../shared/navbar-list";
import { useState } from "react";

export default function MobileSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
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
    );
}
