import { z } from "zod";

export const authSchema = z.object({
    email: z.string().email("Email address is not valid"),
    password: z.string().min(5, "Password must be at least 5 characters"),
});

export type AuthSchema = z.infer<typeof authSchema>;
