import { apiAuthHeaders, apiUrl, getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import OrdersContainer from "@/components/orders/container";
import CancelOrderButton from "@/components/orders/cancel-order-button";

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

async function getOrders(page: number): Promise<OrdersPageData> {
    const response = await fetch(`${apiUrl()}/orders?page=${page}`, {
        headers: await apiAuthHeaders(),
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to load orders");
    }

    return response.json();
}

function formatMoney(value: number) {
    return `$ ${value.toLocaleString()}`;
}

export default async function OrdersPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const session = await getSession();

    if (!session?.user) {
        redirect("/");
    }

    const requestedPage = Number((await searchParams).page) || 1;
    const { items: orders, page, pageCount } = await getOrders(requestedPage);

    if (pageCount > 0 && page !== requestedPage) {
        redirect(`/account/orders?page=${page}`);
    }

    if (orders.length === 0) {
        return (
            <OrdersContainer>
                <p className="text-sm text-black/50">
                    You don&apos;t have any orders yet.
                </p>
            </OrdersContainer>
        );
    }

    return (
        <OrdersContainer>
            <div>
                {orders.map((order) => (
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
                                        }
                                    )}
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <p className="text-sm font-bold">
                                    {formatMoney(order.totalAmount)}
                                </p>
                                {(order.status === "PENDING" ||
                                    order.status === "PROCESSING") && (
                                    <CancelOrderButton orderId={order.id} />
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
                                                item.price * item.quantity
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
            {pageCount > 1 && (
                <nav className="flex items-center justify-between border-t border-black/10 pt-6">
                    {page > 1 ? (
                        <Link
                            href={`/account/orders?page=${page - 1}`}
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
                        {page} / {pageCount}
                    </p>
                    {page < pageCount ? (
                        <Link
                            href={`/account/orders?page=${page + 1}`}
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
        </OrdersContainer>
    );
}
