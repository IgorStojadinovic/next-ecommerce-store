import { cn } from "@/lib/utils";
export default function CheckoutSection({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <section className={cn(className)}>{children}</section>;
}
