"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
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
                    "flex items-center justify-center cursor-pointer group focus-visible:outline-none focus:outline-none"
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
            <DialogContent className="flex flex-col gap-8 w-[400px] bg-zinc-950 text-white border-zinc-800">
                <DialogHeader className=" items-start justify-between pt-8 flex-col  ">
                    <DialogTitle className="text-sm normal-case">
                        Login to your account
                    </DialogTitle>
                    <p className="text-sm ">
                        Enter your email below to login to your account
                    </p>
                </DialogHeader>
                <LoginForm setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
}
