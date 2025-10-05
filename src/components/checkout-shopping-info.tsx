import { FormInput } from "./form-input";
import { UseFormRegister } from "react-hook-form";
import { CheckoutFormValues } from "@/lib/types";
export default function CheckoutShoppingInfo({
    register,
}: {
    register: UseFormRegister<CheckoutFormValues>;
}) {
    return (
        <section>
            <p className="text-sm font-bold uppercase text-(--color-orange-primary) pb-4">
                Shipping Info
            </p>
            <div className="grid grid-cols-1 grid-rows-3 md:grid-rows-3 md:grid-cols-2 gap-6">
                <FormInput
                    label="Address"
                    name="address"
                    placeholder="1133 Burwood Way"
                    register={register}
                    className="md:col-span-2"
                    inputClassName="h-12 focus-visible:ring-0"
                />
                <FormInput
                    label="City"
                    name="city"
                    placeholder="Albuquerque"
                    register={register}
                    inputClassName="h-12 focus-visible:ring-0"
                />
                <FormInput
                    label="Zip"
                    name="zip"
                    placeholder="87110"
                    register={register}
                    inputClassName="h-12 focus-visible:ring-0"
                />
                <FormInput
                    label="State"
                    name="state"
                    placeholder="New Mexico"
                    register={register}
                    inputClassName="h-12 focus-visible:ring-0"
                />
            </div>
        </section>
    );
}
