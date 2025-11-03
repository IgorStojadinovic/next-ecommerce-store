import { Session } from "next-auth";
import { MobileNavbar, DesktopNavbar } from "./navbar";

type NavbarWrapperProps = {
    session: Session | null;
    mobileClassName?: string;
    desktopClassName?: string;
};

export default function NavbarWrapper({
    session,
    mobileClassName,
    desktopClassName,
}: NavbarWrapperProps) {
    const isAuthenticated = !!session?.user;

    return (
        <>
            <MobileNavbar
                isAuthenticated={isAuthenticated}
                className={mobileClassName}
            />
            <DesktopNavbar
                isAuthenticated={isAuthenticated}
                className={desktopClassName}
            />
        </>
    );
}
