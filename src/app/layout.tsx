import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer";
import { CartStoreProvider } from "@/store/providers/cart-store-provider";
import NavbarWrapper from "@/components/layout/navbar/navbar-wrapper";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth/config";
import GithubIcon from "@/components/shared/github-icon";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});

export const metadata: Metadata = {
    title: "audiophile",
    description: "portfolio project",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <html lang="en">
            <body className={`${manrope.variable} antialiased`}>
                <div id="smooth-wrapper">
                    <div id="smooth-content">
                        <SessionProvider session={session}>
                            <CartStoreProvider>
                                <NavbarWrapper session={session} />
                                <main>{children}</main>
                            </CartStoreProvider>
                        </SessionProvider>
                        <Footer />
                    </div>
                </div>
                <GithubIcon />
            </body>
        </html>
    );
}
