export const SESSION_COOKIE = "access_token";

export type SessionUser = {
    id: string;
    email: string | null;
    name: string | null;
    image: string | null;
    address: string | null;
    phone: string | null;
    zip: string | null;
    city: string | null;
    state: string | null;
};
