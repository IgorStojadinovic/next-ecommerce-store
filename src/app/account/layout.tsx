import Container from "@/components/layout/container";
import AccountLinks from "@/components/account/Links";

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-(--color-light-gray)">
            <Container className="flex flex-col gap-8 pt-28 pb-16 lg:flex-row lg:items-start lg:pt-12 lg:pb-24">
                <aside className="w-full lg:w-72 lg:shrink-0">
                    <div className="mb-6">
                        <p className="text-[32px] font-bold uppercase leading-none tracking-[1.5px]">
                            Account
                        </p>
                        <p className="mt-3 text-sm text-black/50">
                            Manage your account and personal information
                        </p>
                    </div>
                    <AccountLinks />
                </aside>
                <div className="min-w-0 flex-1">{children}</div>
            </Container>
        </div>
    );
}
