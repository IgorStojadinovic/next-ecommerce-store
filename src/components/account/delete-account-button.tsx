"use client";

import { useState } from "react";

export default function DeleteAccountButton() {
    const [confirming, setConfirming] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const removeAccount = async () => {
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/users/me", { method: "DELETE" });
            if (!response.ok) {
                throw new Error("Could not delete the account");
            }
            window.location.assign("/");
        } catch {
            setError("Could not delete the account. Try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-8 border-t border-black/10 pt-6">
            <p className="text-xs font-bold uppercase tracking-[1px] text-black/40">
                Delete account
            </p>
            <p className="mt-2 max-w-xl text-sm text-black/50">
                This permanently removes your account, saved address, and
                orders.
            </p>

            {confirming ? (
                <div className="mt-4 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={removeAccount}
                        disabled={isLoading}
                        className="cursor-pointer rounded-sm bg-black px-6 py-3 text-xs font-bold uppercase tracking-[1px] text-white hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {isLoading ? "Deleting..." : "Delete account"}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setConfirming(false);
                            setError("");
                        }}
                        disabled={isLoading}
                        className="cursor-pointer rounded-sm px-6 py-3 text-xs font-bold uppercase tracking-[1px] text-black/50 hover:text-black disabled:opacity-40"
                    >
                        Keep account
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => setConfirming(true)}
                    className="mt-4 cursor-pointer rounded-sm border border-black px-6 py-3 text-xs font-bold uppercase tracking-[1px] text-black hover:bg-black hover:text-white"
                >
                    Delete account
                </button>
            )}

            {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
        </div>
    );
}
