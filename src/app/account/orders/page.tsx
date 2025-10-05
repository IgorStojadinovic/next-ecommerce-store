"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

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

export default function OrdersPage() {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated: () => {
            redirect("/");
        },
    });

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("/api/orders");
                if (!response.ok) throw new Error("Failed to fetch orders");
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        if (session?.user) {
            fetchOrders();
        }
    }, [session]);

    const getStatusColor = (status: Order["status"]) => {
        const colors = {
            PENDING: "text-yellow-600",
            PROCESSING: "text-blue-600",
            SHIPPED: "text-purple-600",
            DELIVERED: "text-green-600",
            CANCELLED: "text-red-600",
        };
        return colors[status];
    };

    const getPaymentStatusColor = (status: Order["paymentStatus"]) => {
        const colors = {
            PENDING: "text-yellow-600",
            COMPLETED: "text-green-600",
            FAILED: "text-red-600",
            REFUNDED: "text-purple-600",
        };
        return colors[status];
    };

    return (
        <section className="flex flex-col gap-8 items-start w-full h-full p-10 pt-46">
            <h1 className="text-2xl font-bold">Orders</h1>
            {loading ? (
                <section className="flex  gap-8 items-start w-full  p-10 pt-46 h-[340px] bg-black/5 rounded-md animate-pulse">
                    <div className="w-1/2 h-full    bg-black/5 rounded-md animate-pulse"></div>
                    <div className="w-1/2 h-full bg-black/5 rounded-md animate-pulse"></div>
                </section>
            ) : null}

            {orders.length > 0 && (
                <div className="grid gap-6 w-full shadow-sm bg-black/5 rounded-md p-6">
                    {orders.map((order) => (
                        <div key={order.id} className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm font-medium">
                                        Order #{order.id}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString("en-US")}
                                    </p>
                                    <p
                                        className={`text-sm font-medium ${getStatusColor(
                                            order.status
                                        )}`}
                                    >
                                        Status: {order.status}
                                    </p>
                                    <p
                                        className={`text-sm font-medium ${getPaymentStatusColor(
                                            order.paymentStatus
                                        )}`}
                                    >
                                        Payment: {order.paymentStatus}
                                    </p>
                                </div>
                                <p className="font-medium">
                                    {order.totalAmount} USD
                                </p>
                            </div>

                            <div className="mt-4 text-sm text-gray-600">
                                <p>Shipping method: {order.shippingMethod}</p>
                                <p>Address: {order.shippingAddress}</p>
                            </div>

                            <div className="mt-4 space-y-3">
                                <p className="text-sm font-medium">Products:</p>
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between items-center text-sm"
                                    >
                                        <div>
                                            <p>{item.product.name}</p>
                                            <p className="text-gray-500">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>
                                        <p>{item.price * item.quantity} USD</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
