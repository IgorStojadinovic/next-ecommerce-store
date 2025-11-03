import Container from "@/components/layout/container";

import AccountLinks from "@/components/account/Links";
import Wrapper from "@/components/layout/wapper";

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Container className="flex items-start h-screen">
                <Wrapper>
                    <div className="flex flex-col gap-2 mt-10">
                        <h1>Account</h1>
                        <p>Manage your account and personal information</p>
                    </div>
                    <AccountLinks />
                </Wrapper>
                {children}
            </Container>
        </div>
    );
}
