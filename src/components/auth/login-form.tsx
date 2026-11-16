"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { Input } from "@/components/ui/input";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
    .object({
        mode: z.enum(["login", "register"]),
        name: z.string(),
        email: z.string().email("Enter a valid email"),
        password: z.string(),
        confirm: z.string(),
    })
    .superRefine((value, ctx) => {
        if (value.mode === "register" && value.name.trim().length === 0) {
            ctx.addIssue({
                code: "custom",
                path: ["name"],
                message: "Name is required",
            });
        }

        const minPassword = value.mode === "register" ? 8 : 1;
        if (value.password.length < minPassword) {
            ctx.addIssue({
                code: "custom",
                path: ["password"],
                message:
                    value.mode === "register"
                        ? "Password must be at least 8 characters"
                        : "Password is required",
            });
        }

        if (value.mode === "register" && value.password !== value.confirm) {
            ctx.addIssue({
                code: "custom",
                path: ["confirm"],
                message: "Passwords do not match",
            });
        }
    });

type FormValues = z.infer<typeof formSchema>;

const inputClassName =
    "h-12 rounded-lg border-gray-200 bg-white px-4 text-black focus-visible:border-(--color-orange-primary) focus-visible:ring-0";

function Field({
    label,
    htmlFor,
    error,
    children,
}: {
    label: string;
    htmlFor: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
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

function GoogleIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
        </svg>
    );
}

function errorMessage(body: unknown) {
    if (!body || typeof body !== "object" || !("message" in body)) {
        return "Something went wrong. Try again.";
    }
    const message = (body as { message: unknown }).message;
    if (Array.isArray(message)) {
        return String(message[0] ?? "Something went wrong. Try again.");
    }
    if (typeof message === "string") {
        return message;
    }
    return "Something went wrong. Try again.";
}

export default function LoginForm({ onSuccess }: { onSuccess: () => void }) {
    const router = useRouter();
    const { update } = useAuth();
    const [serverError, setServerError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            mode: "login",
            name: "",
            email: "",
            password: "",
            confirm: "",
        },
    });

    const mode = watch("mode");
    const isRegister = mode === "register";

    const switchMode = () => {
        setServerError("");
        reset({
            mode: isRegister ? "login" : "register",
            name: "",
            email: "",
            password: "",
            confirm: "",
        });
        setValue("mode", isRegister ? "login" : "register");
    };

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        setServerError("");

        try {
            const response = await fetch(
                data.mode === "register" ? "/api/auth/register" : "/api/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        data.mode === "register"
                            ? {
                                  name: data.name,
                                  email: data.email,
                                  password: data.password,
                              }
                            : {
                                  email: data.email,
                                  password: data.password,
                              },
                    ),
                },
            );

            if (!response.ok) {
                setServerError(errorMessage(await response.json().catch(() => null)));
                return;
            }

            await update();
            onSuccess();
            router.refresh();
        } catch {
            setServerError("Something went wrong. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <p className="text-sm font-bold uppercase tracking-[1px] text-(--color-orange-primary)">
                    Account
                </p>
                <DialogTitle className="mt-3 text-2xl leading-tight font-bold tracking-normal normal-case text-black">
                    {isRegister ? "Create account" : "Sign in"}
                </DialogTitle>
                <DialogDescription className="mt-2 text-sm text-black/50">
                    {isRegister
                        ? "Save your details and track your orders."
                        : "Use your email, or continue with Google."}
                </DialogDescription>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <input type="hidden" {...register("mode")} />

                {isRegister ? (
                    <Field label="Name" htmlFor="name" error={errors.name?.message}>
                        <Input
                            id="name"
                            autoComplete="name"
                            {...register("name")}
                            className={inputClassName}
                        />
                    </Field>
                ) : null}

                <Field label="Email" htmlFor="email" error={errors.email?.message}>
                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        {...register("email")}
                        className={inputClassName}
                    />
                </Field>

                <Field
                    label="Password"
                    htmlFor="password"
                    error={errors.password?.message}
                >
                    <Input
                        id="password"
                        type="password"
                        autoComplete={isRegister ? "new-password" : "current-password"}
                        {...register("password")}
                        className={inputClassName}
                    />
                </Field>

                {isRegister ? (
                    <Field
                        label="Confirm password"
                        htmlFor="confirm"
                        error={errors.confirm?.message}
                    >
                        <Input
                            id="confirm"
                            type="password"
                            autoComplete="new-password"
                            {...register("confirm")}
                            className={inputClassName}
                        />
                    </Field>
                ) : null}

                {serverError ? (
                    <p className="text-sm text-red-500">{serverError}</p>
                ) : null}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 cursor-pointer rounded-sm bg-(--color-orange-primary) px-6 py-3 text-xs font-bold uppercase tracking-[1px] text-white hover:bg-(--color-orange-secondary) disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {isLoading
                        ? "Please wait..."
                        : isRegister
                          ? "Create account"
                          : "Sign in"}
                </button>
            </form>

            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[1px] text-black/40">
                <span className="h-px flex-1 bg-black/10" />
                or
                <span className="h-px flex-1 bg-black/10" />
            </div>

            <button
                type="button"
                onClick={() => {
                    window.location.assign("/api/auth/google");
                }}
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-sm border border-black/15 bg-white px-6 py-3 text-sm font-bold text-black hover:border-(--color-orange-primary)"
            >
                <GoogleIcon />
                Continue with Google
            </button>

            <p className="text-center text-sm text-black/50">
                {isRegister ? "Already have an account?" : "New here?"}{" "}
                <button
                    type="button"
                    onClick={switchMode}
                    className="cursor-pointer font-bold text-(--color-orange-primary)"
                >
                    {isRegister ? "Sign in" : "Create an account"}
                </button>
            </p>
        </div>
    );
}
