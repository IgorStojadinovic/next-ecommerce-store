import { cn } from "@/lib/utils";

export default function Button({
    type,
    children,
    className,
    onClick,
    disabled,
}: {
    type: "primary" | "secondary" | "dark" | "ghost" | "cart";
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
}) {
    const buttonTypes = {
        primary: [
            "bg-(--color-orange-primary) text-white h-[48px] w-[160px] relative overflow-hidden z-[1] cursor-pointer",
            "uppercase text-[0.813rem] font-bold tracking-[1px] flex justify-center items-center px-[30px] py-[15px]",
            "before:content-[''] before:absolute before:top-0 before:left-[-120%] before:w-full before:h-full",
            "before:bg-(--color-orange-secondary) before:transition-[left] before:duration-300 before:ease-in-out",
            "before:transform before:skew-x-[45deg] before:-z-[1]",
            "hover:before:left-0",
            "disabled:opacity-50 disabled:cursor-not-allowed",
        ].join(" "),

        secondary: [
            "bg-transparent text-black relative overflow-hidden z-[1] cursor-pointer",
            "uppercase text-[0.813rem] font-bold tracking-[1px] flex justify-center items-center px-[30px] py-[15px]",
            "before:content-[''] before:absolute before:top-0 before:left-[-120%] before:w-full before:h-full",
            "before:bg-black before:transition-[left] before:duration-300 before:ease-in-out",
            "before:transform before:skew-x-[45deg] before:-z-[1]",
            "hover:before:left-0 hover:text-white",
            "disabled:opacity-50 disabled:cursor-not-allowed",
        ].join(" "),

        dark: [
            "bg-black text-white relative overflow-hidden z-[1] cursor-pointer border border-black h-[48px]",
            "uppercase text-[0.813rem] font-bold tracking-[1px] flex justify-center items-center px-[30px] py-[15px]",
            "before:content-[''] before:absolute before:top-0 before:left-[-120%] before:w-full before:h-full",
            "before:bg-(--color-orange-primary) before:transition-[left] before:duration-300 before:ease-in-out",
            "before:transform before:skew-x-[45deg] before:-z-[1]",
            "hover:before:left-0 hover:text-white hover:border hover:border-black",
            "disabled:opacity-50 disabled:cursor-not-allowed",
        ].join(" "),

        ghost: [
            "bg-transparent text-black border border-black relative overflow-hidden z-[1] cursor-pointer h-[48px] ",
            "uppercase text-[0.813rem] font-bold tracking-[1px] flex justify-center items-center px-[30px] py-[15px]",
            "before:content-[''] before:absolute before:top-0 before:left-[-120%] before:w-full before:h-full",
            "before:bg-black before:transition-[left] before:duration-300 before:ease-in-out",
            "before:transform before:skew-x-[45deg] before:-z-[1]",
            "hover:before:left-0 hover:text-white",
            "disabled:opacity-50 disabled:cursor-not-allowed",
        ].join(" "),

        cart: [
            "bg-transparent text-black/50 cursor-pointer",
            "uppercase text-[0.813rem] font-bold tracking-[1px] flex justify-center items-center",
            "hover:bg-black/10 transition-colors duration-300 hover:text-(--color-orange-primary)",
            "disabled:opacity-50 disabled:cursor-not-allowed",
        ].join(" "),
    };

    return (
        <button
            className={cn(buttonTypes[type], className)}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
