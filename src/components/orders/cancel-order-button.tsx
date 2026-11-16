"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CancelOrderButton({ orderId }: { orderId: number }) {
    const router = useRouter();
    const [isCancelling, setIsCancelling] = useState(false);

    const cancelOrder = async () => {
        setIsCancelling(true);

        try {
            const response = await fetch(`/api/orders/${orderId}/cancel`, {
                method: "PATCH",
            });

            if (!response.ok) {
                const errorText = await response.text();
                let message = "Could not cancel this order";
                try {
                    const parsed = JSON.parse(errorText) as {
                        message?: string | string[];
                    };
                    if (Array.isArray(parsed.message)) {
                        message = parsed.message.join(", ");
                    } else if (parsed.message) {
                        message = parsed.message;
                    }
                } catch {
                    if (errorText) {
                        message = errorText;
                    }
                }
                throw new Error(message);
            }

            toast.success("Order cancelled");
            router.refresh();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Could not cancel this order",
            );
            setIsCancelling(false);
        }
    };

    return (
        <button
            type="button"
            onClick={cancelOrder}
            disabled={isCancelling}
            className="cursor-pointer rounded-sm bg-(--color-orange-primary) px-4 py-2 text-xs font-bold uppercase tracking-[1px] text-white hover:bg-(--color-orange-secondary) disabled:cursor-not-allowed disabled:opacity-40"
        >
            {isCancelling ? "Cancelling..." : "Cancel order"}
        </button>
    );
}
