import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

interface FormInputProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    placeholder?: string;
    register: UseFormRegister<T>;
    type?: string;
    className?: string;
    inputClassName?: string;
}

export function FormInput<T extends FieldValues>({
    label,
    name,
    placeholder,
    register,
    type = "text",
    className,
    inputClassName,
}: FormInputProps<T>) {
    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <Label className="text-xs font-bold">{label}</Label>
            <Input
                type={type}
                {...register(name)}
                placeholder={placeholder}
                className={cn("py-4 px-6 rounded-lg border border-gray-200 placeholder:text-black/50", inputClassName)}
            />
        </div>
    );
}
