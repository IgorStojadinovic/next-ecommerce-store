import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FormInput } from "./form-input";
import { UseFormRegister } from "react-hook-form";
import { CheckoutFormValues } from "@/lib/types";
import Image from "next/image";

export default function CheckoutPayment({
    register,
}: {
    register: UseFormRegister<CheckoutFormValues>;
}) {
    return (
        <section className="flex flex-col gap-6">
            <div className="grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-4 ">
                <div className="md:col-span-1 md:row-span-2">
                    <p className="text-sm font-bold uppercase text-(--color-orange-primary) pb-4">
                        Payment Details
                    </p>
                    <p className="text-sm font-bold">Payment Method</p>
                </div>

                <Label className="group text-sm font-bold border border-gray-200 rounded-lg p-4 cursor-pointer  has-[:checked]:border-(--color-orange-primary) lg:mt-6">
                    <Input
                        type="radio"
                        name="paymentMethod"
                        className="hidden"
                    />
                    <span className=" flex items-center justify-center  h-5 w-5 rounded-full border border-gray-400">
                        <span className="group-has-[:checked]:bg-(--color-orange-primary)  h-2.5 w-2.5 rounded-full"></span>
                    </span>

                    <span className="">Card</span>
                </Label>
                <Label className="group text-sm font-bold border border-gray-200 rounded-lg p-4 cursor-pointer  has-[:checked]:border-(--color-orange-primary) ">
                    <Input
                        type="radio"
                        name="paymentMethod"
                        className="hidden"
                    />
                    <span className=" flex items-center justify-center  h-5 w-5 rounded-full border border-gray-400">
                        <span className="group-has-[:checked]:bg-(--color-orange-primary)  h-2.5 w-2.5 rounded-full"></span>
                    </span>

                    <span className="">Cash on Delivery</span>
                </Label>

                <FormInput
                    label="Card Number"
                    name="cardNumber"
                    placeholder="238521993"
                    register={register}
                    className="lg:hidden"
                />
                <FormInput
                    label="Card Pin"
                    name="cardPin"
                    placeholder="238521993"
                    register={register}
                    className="lg:hidden"
                />
                <div className="lg:col-span-2 gap-4 items-center hidden lg:flex">
                    <Image
                        src="/assets/checkout/icon-cash-on-delivery.svg"
                        alt="Cash on Delivery"
                        width={48}
                        height={48}
                        className="lg:col-span-2 h-12 w-12"
                    />
                    <p className="lg:col-span-2 text-sm font-bold opacity-50 leading-6">
                        The ‘Cash on Delivery’ option enables you to pay in cash
                        when our delivery courier arrives at your residence.
                        Just make sure your address is correct so that your
                        order will not be cancelled.
                    </p>
                </div>
            </div>
        </section>
    );
}
