import { auth } from "@/lib/auth/config";
import { redirect } from "next/navigation";

export default async function AccountPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/");
    }

    return (
        <>
            <section className="flex flex-col gap-8  items-start w-full h-full p-10 pt-46">
                <h1 className="text-2xl font-bold">Personal Information</h1>

                <div className="grid gap-4 mt-0">
                    <div className="flex gap-4 items-center ">
                        <label className="text-sm font-medium uppercase">
                            Email
                        </label>
                        <p className="text-gray-700">{session?.user?.email}</p>
                    </div>

                    <div className="flex  gap-4 items-center ">
                        <label className="text-sm font-medium uppercase">
                            Name
                        </label>
                        <p className="text-gray-700">{session?.user?.name}</p>
                    </div>

                    <div className="flex  gap-4 items-center ">
                        <label className="text-sm font-medium uppercase">
                            Address
                        </label>
                        <p className="text-gray-700">
                            {session?.user?.address || "N/A"}
                        </p>
                    </div>

                    <div className="flex  gap-4 items-center ">
                        <label className="text-sm font-medium uppercase">
                            Phone
                        </label>
                        <p className="text-gray-700">
                            {session?.user?.phone || "N/A"}
                        </p>
                    </div>

                    <div className="flex  gap-4 items-center ">
                        <label className="text-sm font-medium uppercase">
                            Zip
                        </label>
                        <p className="text-gray-700">
                            {session?.user?.zip || "N/A"}
                        </p>
                    </div>

                    <div className="flex  gap-4 items-center ">
                        <label className="text-sm font-medium uppercase">
                            City
                        </label>
                        <p className="text-gray-700">
                            {session?.user?.city || "N/A"}
                        </p>
                    </div>

                    <div className="flex  gap-4 items-center ">
                        <label className="text-sm font-medium uppercase">
                            State
                        </label>
                        <p className="text-gray-700">
                            {session?.user?.state || "N/A"}
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
