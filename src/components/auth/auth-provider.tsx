"use client";

import { createContext, useContext, useState } from "react";
import { SessionUser } from "@/lib/auth/token";

type AuthContextValue = {
    user: SessionUser | null;
    update: (next?: { user?: Partial<SessionUser> }) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
    initialUser,
    children,
}: {
    initialUser: SessionUser | null;
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<SessionUser | null>(initialUser);

    const update = async (next?: { user?: Partial<SessionUser> }) => {
        if (next?.user) {
            setUser((current) =>
                current ? { ...current, ...next.user } : current,
            );
        }

        const response = await fetch("/api/auth/me");
        if (!response.ok) {
            setUser(null);
            return;
        }

        setUser((await response.json()) as SessionUser);
    };

    return (
        <AuthContext.Provider value={{ user, update }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return value;
}
