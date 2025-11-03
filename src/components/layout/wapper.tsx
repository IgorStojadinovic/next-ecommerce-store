import { cn } from "@/lib/utils";
export default function Wrapper({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <section className={className}>
            {children}
        </section>
    );
}