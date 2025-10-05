import { FormInput } from "./form-input";
import { UseFormRegister } from "react-hook-form";
import { CheckoutFormValues } from "@/lib/types";

export default function CheckoutBillingDetails({
    register,
}: {
    register: UseFormRegister<CheckoutFormValues>;
}) {
    return (
        <section>
            <p className="text-sm font-bold uppercase text-(--color-orange-primary) pb-4">
                Billing Details
            </p>
            <div className="grid grid-cols-1 grid-rows-3 md:grid-rows-2 md:grid-cols-2 gap-6">
                <FormInput
                    label="Name"
                    name="name"
                    placeholder="Alexei Ward"
                    register={register}
                    inputClassName="h-12 focus-visible:ring-0"
                />
                <FormInput
                    label="Email"
                    name="email"
                    placeholder="alexei@mail.com"
                    register={register}
                    inputClassName="h-12 focus-visible:ring-0"
                />
                <FormInput
                    label="Phone"
                    name="phone"
                    placeholder="+1 202-555-0136"
                    register={register}
                    inputClassName="h-12 focus-visible:ring-0"
                />
            </div>
        </section>
    );
}
