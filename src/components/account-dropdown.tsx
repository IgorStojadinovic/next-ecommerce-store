import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function AccountDropdown() {
    const handleLogout = async () => {
        await signOut({
            redirect: false,
        });
    };
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                    <Avatar>
                        <AvatarImage
                            src="/assets/account.svg"
                            alt="account"
                            aria-label="account"
                            style={{
                                filter: "invert(56%) sepia(18%) saturate(2352%) hue-rotate(346deg) brightness(140%) contrast(84%)",
                            }}
                        />
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                        <Link href="/account">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        <Link href="/account/orders">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={handleLogout}
                    >
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
