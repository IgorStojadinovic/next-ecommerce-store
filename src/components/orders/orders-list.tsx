"use client";

import CancelOrderButton from "@/components/orders/cancel-order-button";
import Link from "next/link";
import { useEffect, useState } from "react";

type OrderItem = {
    id: number;
    quantity: number;
    price: number;
    product: {
        name: string;
    };
};

type Order = {
    id: number;
    createdAt: string;
    totalAmount: number;
    status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    paymentStatus: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
    shippingAddress: string;
    shippingMethod: string;
    items: OrderItem[];
};

type OrdersPageData = {
    page: number;
    pageSize: number;
    total: number;
    pageCount: number;
    items: Order[];
};

function formatMoney(value: number) {
    return `$ ${value.toLocaleString()}`;
}

export default function OrdersList({ page }: { page: number }) {
    const [data, setData] = useState<OrdersPageData | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        let ignore = false;
        setData(null);
        setError("");

        fetch(`/api/orders?page=${page}`)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Failed to load orders");
                }
                return (await response.json()) as OrdersPageData;
            })
            .then((next) => {
                if (!ignore) {
                    setData(next);
                }
            })
            .catch(() => {
                if (!ignore) {
                    setError("Could not load orders. Try again.");
                }
            });

        return () => {
            ignore = true;
        };
    }, [page]);

    const reload = () => {
        setData(null);
        setError("");
        fetch(`/api/orders?page=${page}`)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Failed to load orders");
                }
                return (await response.json()) as OrdersPageData;
            })
            .then(setData)
            .catch(() => setError("Could not load orders. Try again."));
    };

    if (error) {
        return <p className="text-sm text-red-500">{error}</p>;
    }

    if (!data) {
        return <p className="text-sm text-black/50">Loading orders...</p>;
    }

    if (data.items.length === 0) {
        return (
            <p className="text-sm text-black/50">
                You don&apos;t have any orders yet.
            </p>
        );
    }

    return (
        <>
            <div>
                {data.items.map((order) => (
                    <article
                        key={order.id}
                        className="border-t border-black/10 py-6 first:border-t-0"
                    >
                        <div className="flex items-baseline justify-between gap-4">
                            <div>
                                <p className="text-sm font-bold uppercase tracking-[1px]">
                                    Order #{order.id}
                                </p>
                                <p className="pt-1 text-sm text-black/50">
                                    {new Date(order.createdAt).toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        },
                                    )}
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <p className="text-sm font-bold">
                                    {formatMoney(order.totalAmount)}
                                </p>
                                {(order.status === "PENDING" ||
                                    order.status === "PROCESSING") && (
                                    <CancelOrderButton
                                        orderId={order.id}
                                        onCancelled={reload}
                                    />
                                )}
                            </div>
                        </div>

                        <ul className="flex flex-col gap-4 pt-6">
                            {order.items.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center justify-between gap-4"
                                >
                                    <div>
                                        <p className="text-sm font-bold">
                                            {item.product.name}
                                        </p>
                                        <p className="pt-1 text-sm font-bold text-black/50">
                                            {formatMoney(
                                                item.price * item.quantity,
                                            )}
                                        </p>
                                    </div>
                                    <p className="text-sm font-bold text-black/50">
                                        x{item.quantity}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 pt-6 md:grid-cols-4">
                            <div>
                                <dt className="text-xs font-bold uppercase tracking-[1px] text-black/40">
                                    Status
                                </dt>
                                <dd className="pt-1 text-sm font-bold">
                                    {order.status}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs font-bold uppercase tracking-[1px] text-black/40">
                                    Payment
                                </dt>
                                <dd className="pt-1 text-sm font-bold">
                                    {order.paymentStatus}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs font-bold uppercase tracking-[1px] text-black/40">
                                    Shipping
                                </dt>
                                <dd className="pt-1 text-sm font-bold">
                                    {order.shippingMethod}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs font-bold uppercase tracking-[1px] text-black/40">
                                    Address
                                </dt>
                                <dd className="pt-1 text-sm font-bold">
                                    {order.shippingAddress}
                                </dd>
                            </div>
                        </dl>
                    </article>
                ))}
            </div>
            {data.pageCount > 1 && (
                <nav className="flex items-center justify-between border-t border-black/10 pt-6">
                    {data.page > 1 ? (
                        <Link
                            href={`/account/orders?page=${data.page - 1}`}
                            className="text-sm font-bold uppercase tracking-[1px] text-black/50 hover:text-(--color-orange-primary)"
                        >
                            Previous
                        </Link>
                    ) : (
                        <span className="text-sm font-bold uppercase tracking-[1px] text-black/20">
                            Previous
                        </span>
                    )}
                    <p className="text-sm text-black/50">
                        {data.page} / {data.pageCount}
                    </p>
                    {data.page < data.pageCount ? (
                        <Link
                            href={`/account/orders?page=${data.page + 1}`}
                            className="text-sm font-bold uppercase tracking-[1px] text-black/50 hover:text-(--color-orange-primary)"
                        >
                            Next
                        </Link>
                    ) : (
                        <span className="text-sm font-bold uppercase tracking-[1px] text-black/20">
                            Next
                        </span>
                    )}
                </nav>
            )}
        </>
    );
}
