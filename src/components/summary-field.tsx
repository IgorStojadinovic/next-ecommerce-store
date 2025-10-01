"use client";
import { cn } from "@/lib/utils";
export default function SummaryField({
    label,
    value,
    className,
}: {
    label: string;
    value: string;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "flex items-center justify-between uppercase",
                className,
                label === "Grand Total"
                    ? "text-(--color-orange-primary) pt-6"
                    : "text-black/50 pt-2"
            )}
        >
            <p className="text-sm font-bold">{label}</p>
            {value ? (
                <p className="text-sm font-bold ">$ {value}</p>
            ) : (
                <p className="text-sm font-bold animate-pulse">$ 0</p>
            )}
        </div>
    );
}
