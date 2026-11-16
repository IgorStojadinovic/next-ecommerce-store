"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/auth/logout";

const links = [
    { label: "Personal Information", href: "/account" },
    { label: "Orders", href: "/account/orders" },
    { label: "Address", href: "/account/address" },
];

export default function AccountLinks() {
    const pathname = usePathname();

    return (
        <nav className="rounded-lg bg-white p-3">
            <ul className="flex gap-2 overflow-x-auto lg:flex-col">
                {links.map((link) => {
                    const isActive =
                        link.href === "/account"
                            ? pathname === "/account"
                            : pathname.startsWith(link.href);

                    return (
                        <li key={link.href} className="shrink-0 lg:shrink">
                            <Link
                                href={link.href}
                                className={`block rounded-md px-4 py-3 text-sm font-bold uppercase tracking-[1px] transition-colors ${
                                    isActive
                                        ? "bg-(--color-orange-primary) text-white"
                                        : "text-black/70 hover:bg-(--color-gray)"
                                }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <button
                onClick={() => logout()}
                className="mt-2 w-full cursor-pointer rounded-md px-4 py-3 text-left text-sm font-bold uppercase tracking-[1px] text-black/50 transition-colors hover:bg-black hover:text-white"
            >
                Logout
            </button>
        </nav>
    );
}
