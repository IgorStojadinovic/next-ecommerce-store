import { auth } from "@/lib/auth/config";
import { redirect } from "next/navigation";
import OrdersContainer from "@/components/orders/container";
import { prisma } from "@/lib/db/prisma";

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

async function getOrders(userId: string): Promise<Order[]> {
    const orders = await prisma.order.findMany({
        where: { userId },
        include: {
            items: {
                include: {
                    product: {
                        select: { name: true },
                    },
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    return orders.map((order) => ({
        id: order.id,
        createdAt: order.createdAt.toISOString(),
        totalAmount: Number(order.totalAmount),
        status: order.status,
        paymentStatus: order.paymentStatus,
        shippingAddress: order.shippingAddress || "",
        shippingMethod: order.shippingMethod || "",
        items: order.items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: Number(item.price),
            product: {
                name: item.product.name,
            },
        })),
    }));
}

export default async function OrdersPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/");
    }

    const orders = await getOrders(session.user.id);

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

    if (orders.length === 0) {
        return (
            <OrdersContainer>
                <p className="text-sm text-gray-500">
                    You don&apos;t have any orders yet
                </p>
            </OrdersContainer>
        );
    }

    return (
        <OrdersContainer>
            <div className="flex flex-col gap-6 w-full border border-black/10  rounded-md p-6 overflow-y-scroll">
                {orders.map((order) => (
                    <div key={order.id} className="p-6 bg-black/5 rounded-md ">
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
                            <p className="font-medium ">
                                TOTAL: $ {order.totalAmount.toLocaleString()}
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
                                    <p>
                                        ${" "}
                                        {(
                                            item.price * item.quantity
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </OrdersContainer>
    );
}
