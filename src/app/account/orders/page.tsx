import OrdersContainer from "@/components/orders/container";
import OrdersList from "@/components/orders/orders-list";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function OrdersPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const session = await getSession();

    if (!session?.user) {
        redirect("/");
    }

    const page = Number((await searchParams).page) || 1;

    return (
        <OrdersContainer>
            <OrdersList page={page} />
        </OrdersContainer>
    );
}
