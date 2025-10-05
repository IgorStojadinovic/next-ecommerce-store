import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Footer from "../components/footer";
import { CartStoreProvider } from "@/context/cart-store-provider";
import { SessionProvider } from "next-auth/react";

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
    return (
        <html lang="en">
            <body className={`${manrope.variable} antialiased`}>
                <div id="smooth-wrapper">
                    <div id="smooth-content">
                        <SessionProvider>
                            <CartStoreProvider>
                                <main>{children}</main>
                            </CartStoreProvider>
                            <Footer />
                        </SessionProvider>
                    </div>
                </div>
            </body>
        </html>
    );
}
