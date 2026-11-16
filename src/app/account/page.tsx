import DeleteAccountButton from "@/components/account/delete-account-button";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

const fields = [
    { label: "Email", key: "email" },
    { label: "Name", key: "name" },
    { label: "Phone", key: "phone" },
    { label: "Address", key: "address" },
    { label: "City", key: "city" },
    { label: "Zip", key: "zip" },
    { label: "State", key: "state" },
] as const;

export default async function AccountPage() {
    const session = await getSession();

    if (!session?.user) {
        redirect("/");
    }

    const user = session.user;
    const initials = (user.name || user.email || "?")
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    return (
        <section className="rounded-lg bg-white p-6 md:p-8">
            <div className="flex items-center gap-4 border-b border-black/10 pb-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-(--color-orange-primary) text-lg font-bold text-white">
                    {initials}
                </div>
                <div>
                    <h2 className="text-2xl leading-tight tracking-[1px]">
                        {user.name || "Your account"}
                    </h2>
                    <p className="mt-1 text-sm text-black/50">{user.email}</p>
                </div>
            </div>

            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                {fields.map((field) => {
                    const value = user[field.key];
                    return (
                        <div key={field.key}>
                            <dt className="text-xs font-bold uppercase tracking-[1px] text-black/40">
                                {field.label}
                            </dt>
                            <dd className="mt-2 text-sm font-medium text-black">
                                {value || "Not added"}
                            </dd>
                        </div>
                    );
                })}
            </dl>
            <DeleteAccountButton />
        </section>
    );
}
