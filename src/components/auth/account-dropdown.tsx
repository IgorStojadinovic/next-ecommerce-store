"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function AccountDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger
                    className={
                        "cursor-pointer h-[24px] w-[24px] focus-visible:outline-none focus:outline-none"
                    }
                >
                    <Avatar className="h-[24px] w-[24px]">
                        <AvatarImage
                            src="/assets/account.svg"
                            alt="account"
                            aria-label="account"
                            className="h-[24px] w-[24px]"
                            style={{
                                filter: "invert(56%) sepia(18%) saturate(2352%) hue-rotate(346deg) brightness(140%) contrast(84%)",
                            }}
                        />
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        <Link href="/account">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        <Link href="/account/orders">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => signOut()}
                    >
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
