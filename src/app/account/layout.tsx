"use client";
import Container from "@/components/container";
import { DesktopNavbar } from "@/components/navbar";
import { MobileNavbar } from "@/components/navbar";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const handleLogout = async () => {
        await signOut({
            redirect: true,
            callbackUrl: "/",
        });
    };
    return (
        <div>
            <MobileNavbar className="bg-black relative border-none" />
            <Container className="bg-black">
                <DesktopNavbar />
            </Container>

            <Container className="flex items-start  h-screen">
                <section>
                    <div className="flex flex-col gap-2 mt-10">
                        <h1>Account</h1>
                        <p>Manage your account and personal information</p>
                    </div>
                    <ul className="flex flex-col gap-10 mt-8 border border-black p-10 rounded-md">
                        <li>
                            <Link
                                href="/account"
                                className="hover:underline underline-offset-5 "
                            >
                                Personal Information
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/account/orders"
                                className="hover:underline"
                            >
                                Orders
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/account/address"
                                className="hover:underline"
                            >
                                Address
                            </Link>
                        </li>

                        <li>
                            <button
                                onClick={handleLogout}
                                className="hover:underline cursor-pointer"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </section>
                {children}
            </Container>
        </div>
    );
}
