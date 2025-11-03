"use server";
import { signIn, signOut } from "@/lib/auth/config";
import { prisma } from "../db/prisma";
import bcrypt from "bcrypt";
import { authSchema } from "../zod-validators";

export const login = async (formData: FormData) => {
    try {
        // Validate the form fields
        const formFields = Object.fromEntries(formData.entries());
        const validatedFields = authSchema.safeParse(formFields);

        if (!validatedFields.success) {
            return { error: "Invalid fields" };
        }
        const { email, password } = validatedFields.data;

        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return { error: "User not found" };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return { error: "Invalid password" };
        }
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (!result) {
            return { error: "Login failed" };
        }
        return { success: true };
    } catch (error) {
        return { error: "Login failed. Something went wrong", cause: error };
    }
};

export const logout = async () => {
    await signOut();
};
