"use client";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import LoginForm from "./login-form";
import { useState } from "react";

export default function LoginModal() {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className={
                    "flex cursor-pointer items-center justify-center group focus-visible:outline-none focus:outline-none"
                }
            >
                <Avatar className="h-[24px] w-[24px]">
                    <AvatarImage
                        src="/assets/account.svg"
                        alt="account"
                        aria-label="account"
                        className="h-[24px] w-[24px]"
                    />
                </Avatar>
            </DialogTrigger>
            <DialogContent className="max-h-[calc(100dvh-2rem)] w-[min(100%,400px)] overflow-y-auto border-black/10 bg-white p-6 text-black sm:max-w-[400px] sm:p-8">
                <LoginForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
