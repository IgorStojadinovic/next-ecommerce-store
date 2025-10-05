"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, useSession } from "next-auth/react";

import AccountDropdown from "@/components/account-dropdown";
import Link from "next/link";
import Button from "../button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "@/lib/validations";
import { LoginFormValues } from "@/lib/types";
import { useEffect, useState } from "react";

export default function LoginModal() {
    const { data: session } = useSession();
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "test@example.com",
            password: "testuser-prisma",
        },
        mode: "onChange", // Ovo će omogućiti validaciju pri kucanju
    });

    const onSubmit = async (data: LoginFormValues) => {
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });
        if (result?.error) {
            setError(result.error);
        }
    };

    console.log(error);

    useEffect(() => {}, [errors.password]);
    return (
        <>
            {session ? (
                <AccountDropdown />
            ) : (
                <Dialog>
                    <DialogTrigger className="relative flex items-center justify-center cursor-pointer group">
                        <Avatar>
                            <AvatarImage
                                src="/assets/account.svg"
                                alt="account"
                                aria-label="account"
                            />
                        </Avatar>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col gap-8 w-[400px] bg-zinc-950 text-white border-zinc-800">
                        <DialogHeader className=" items-start justify-between pt-8 flex-col  ">
                            <DialogTitle className="text-sm normal-case">
                                Login to your account
                            </DialogTitle>
                            <p className="text-sm ">
                                Enter your email below to login to your account
                            </p>
                        </DialogHeader>
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Label className="flex flex-col gap-2 items-start">
                                <p className="text-xs font-bold">Email</p>
                                <Input
                                    type="email"
                                    placeholder="test@example.com"
                                    {...register("email")}
                                    className="py-3 px-4 rounded-sm border border-zinc-800 placeholder:text-white/50 w-full"
                                    aria-invalid={
                                        errors.email ? "true" : "false"
                                    }
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs">
                                        {errors.email.message}
                                    </p>
                                )}
                            </Label>
                            <Label className="flex flex-col gap-3 items-start">
                                <div className="flex items-center justify-between w-full">
                                    <p className="text-xs font-bold">
                                        Password
                                    </p>
                                    <Link
                                        href="/forgot-password"
                                        className="text-xs"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>

                                <Input
                                    type="password"
                                    {...register("password")}
                                    className="py-3 px-4 rounded-sm border border-zinc-800 placeholder:text-white/50 w-full"
                                    aria-invalid={
                                        errors.password || error
                                            ? "true"
                                            : "false"
                                    }
                                    onChange={() => setError(null)}
                                />
                                {(errors.password || error) && (
                                    <p className="text-red-500 text-xs">
                                        {errors.password?.message ||
                                            "Invalid password"}
                                    </p>
                                )}
                            </Label>
                            {errors.password && (
                                <p className="text-red-500 text-sm text-center">
                                    {errors.password.message}
                                </p>
                            )}
                            <Button
                                type="primary"
                                className="w-full rounded-sm"
                            >
                                Login
                            </Button>
                            <p className="text-xs text-center">
                                {" "}
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/signup"
                                    className="text-(--color-orange-primary)"
                                >
                                    Signup
                                </Link>
                            </p>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
