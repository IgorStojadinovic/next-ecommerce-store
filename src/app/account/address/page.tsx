"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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

export default function AddressPage() {
    const { data: session, update } = useSession({
        required: true,
        onUnauthenticated: () => {
            redirect("/");
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            name: session?.user?.name || "",
            address: session?.user?.address || "",
            phone: session?.user?.phone || "",
            zip: session?.user?.zip || "",
            city: session?.user?.city || "",
            state: session?.user?.state || "",
        },
    });

    const onSubmit = async (data: AddressFormValues) => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/user/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("An error occurred while updating the data");
            }

            await update();
            toast.success("Data updated successfully");
        } catch (error) {
            toast.error("An error occurred while updating the data");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="flex flex-col gap-8 items-start w-full h-full p-10 pt-46">
            <div className="w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-6">Address</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Email</label>
                        <p className="text-gray-700">{session?.user?.email}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input {...register("name")}  className="rounded-xs"/>
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Address</label>
                        <Input {...register("address")} className="rounded-xs"/>
                        {errors.address && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.address.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium">Phone</label>
                        <Input {...register("phone")} className="rounded-xs"/>
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium">ZIP</label>
                        <Input {...register("zip")} className="rounded-xs"/>
                        {errors.zip && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.zip.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium">City</label>
                        <Input {...register("city")} className="rounded-xs"/>
                        {errors.city && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.city.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium">State</label>
                        <Input {...register("state")} className="rounded-xs"/>
                        {errors.state && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.state.message}
                            </p>
                        )}
                    </div>

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Save changes"}
                    </Button>
                </form>
            </div>
        </section>
    );
}
