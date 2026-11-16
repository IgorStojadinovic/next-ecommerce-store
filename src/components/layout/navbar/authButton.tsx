"use client";
import AccountModal from "../../auth/account-dropdown";
import LoginModal from "../../auth/login-modal";
import { useAuth } from "../../auth/auth-provider";
import { useState, useEffect } from "react";

type AuthButtonProps = {
    isAuthenticated: boolean;
};

function AuthButtonSkeleton() {
    return (
        <div
            className="h-[24px] w-[24px] rounded-full bg-(--color-orange-primary) animate-pulse"
            aria-label="Loading authentication status"
        />
    );
}

export default function AuthButton({ isAuthenticated }: AuthButtonProps) {
    const { user } = useAuth();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isHydrated) {
        return <AuthButtonSkeleton />;
    }

    return isAuthenticated || user ? <AccountModal /> : <LoginModal />;
}
