"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useState, useOptimistic, startTransition } from "react";
import { toast } from "sonner";

const addressSchema = z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    phone: z.string().min(1, "Phone is required"),
    zip: z.string().min(1, "ZIP is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

const inputClassName =
    "h-12 rounded-lg border-gray-200 px-6 focus-visible:border-(--color-orange-primary) focus-visible:ring-0";

function Field({
    label,
    htmlFor,
    error,
    className,
    children,
}: {
    label: string;
    htmlFor: string;
    error?: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={className}>
            <label
                htmlFor={htmlFor}
                className="text-xs font-bold uppercase tracking-[1px] text-black/40"
            >
                {label}
            </label>
            <div className="mt-2">{children}</div>
            {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
        </div>
    );
}

export default function AddressPage() {
    const { user, update } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [optimisticUser, addOptimisticUser] = useOptimistic(
        user,
        (state, newData: AddressFormValues) => ({
            ...state,
            ...newData,
            id: state?.id || "",
            email: state?.email || "",
            image: state?.image ?? null,
        })
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            name: user?.name || "",
            address: user?.address || "",
            phone: user?.phone || "",
            zip: user?.zip || "",
            city: user?.city || "",
            state: user?.state || "",
        },
    });

    if (!user) {
        redirect("/");
    }

    const onSubmit = async (data: AddressFormValues) => {
        setIsLoading(true);

        try {
            startTransition(() => {
                addOptimisticUser(data);
            });

            const response = await fetch("/api/users/me", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("An error occurred while updating the data");
            }

            await update({ user: data });

            toast.success("Data updated successfully");
        } catch (error) {
            toast.error("An error occurred while updating the data");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="w-full rounded-lg bg-white p-6 md:p-8">
            <p className="text-sm font-bold uppercase tracking-[1px] text-(--color-orange-primary)">
                Address
            </p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2"
            >
                <Field label="Email" htmlFor="email" className="md:col-span-2">
                    <Input
                        id="email"
                        value={optimisticUser?.email ?? ""}
                        disabled
                        className={`${inputClassName} disabled:cursor-not-allowed disabled:bg-black/5 disabled:text-black/50 disabled:opacity-100`}
                    />
                </Field>

                <Field label="Name" htmlFor="name" error={errors.name?.message}>
                    <Input
                        id="name"
                        {...register("name")}
                        className={inputClassName}
                    />
                </Field>

                <Field
                    label="Phone"
                    htmlFor="phone"
                    error={errors.phone?.message}
                >
                    <Input
                        id="phone"
                        {...register("phone")}
                        className={inputClassName}
                    />
                </Field>

                <Field
                    label="Address"
                    htmlFor="address"
                    error={errors.address?.message}
                    className="md:col-span-2"
                >
                    <Input
                        id="address"
                        {...register("address")}
                        className={inputClassName}
                    />
                </Field>

                <div className="grid grid-cols-1 gap-6 md:col-span-2 md:grid-cols-3">
                    <Field
                        label="City"
                        htmlFor="city"
                        error={errors.city?.message}
                    >
                        <Input
                            id="city"
                            {...register("city")}
                            className={inputClassName}
                        />
                    </Field>

                    <Field label="ZIP" htmlFor="zip" error={errors.zip?.message}>
                        <Input
                            id="zip"
                            {...register("zip")}
                            className={inputClassName}
                        />
                    </Field>

                    <Field
                        label="State"
                        htmlFor="state"
                        error={errors.state?.message}
                    >
                        <Input
                            id="state"
                            {...register("state")}
                            className={inputClassName}
                        />
                    </Field>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-fit cursor-pointer rounded-sm bg-(--color-orange-primary) px-6 py-3 text-xs font-bold uppercase tracking-[1px] text-white hover:bg-(--color-orange-secondary) disabled:cursor-not-allowed disabled:opacity-40 md:col-span-2"
                >
                    {isLoading ? "Updating..." : "Save changes"}
                </button>
            </form>
        </section>
    );
}
