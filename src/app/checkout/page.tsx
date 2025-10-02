"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { DesktopNavbar, MobileNavbar } from "@/components/navbar";
import Link from "next/link";
import Button from "@/components/button";
import CheckoutSection from "@/components/checkout-section";
import CheckoutBillingDetails from "@/components/checkout-billing-details";
import CheckoutPayment from "@/components/checkout-payment";
import CheckoutShoppingInfo from "@/components/checkout-shopping-info";
import CheckoutCart from "@/components/checkout-cart";
import CheckoutPriceSummary from "@/components/checkout-price-summary";
import { CheckoutFormValues } from "@/lib/types";
import { useCartStore } from "@/context/cart-store-provider";

export default function CheckoutPage() {
    const cart = useCartStore((state) => state.cart);
    const { register, handleSubmit } = useForm<CheckoutFormValues>();
    const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
        console.log(data);
    };

    return (
        <>
            <div className=" px-6  pb-24 md:px-10 xl:px-[256px]  bg-black">
                <MobileNavbar className="bg-black relative border-none" />
                <DesktopNavbar className="bg-black relative border-none" />
            </div>
            <div className="flex flex-col gap-8 px-6  pb-24 md:px-10 xl:px-[256px] bg-black/5">
                <Link
                    href="/"
                    className="pt-8 md:pt-8 text-black/50 font-medium"
                >
                    Go Back
                </Link>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-8 lg:flex-row"
                >
                    {/** Billing Details */}
                    <CheckoutSection className="bg-white flex flex-col gap-8 p-6 rounded-md md:p-8 lg:w-2/3">
                        <p className="text-[28px] leading-auto font-bold uppercase">
                            Checkout
                        </p>
                        <CheckoutBillingDetails register={register} />
                        <CheckoutShoppingInfo register={register} />
                        <CheckoutPayment register={register} />
                    </CheckoutSection>
                    {/** Summary */}
                    {cart.length > 0 ? (
                        <CheckoutSection className="bg-white flex flex-col  p-6 rounded-md md:p-8 lg:w-1/3 lg:h-1/3">
                            <p className="text-[18px] leading-auto font-bold uppercase pb-8">
                                Summary
                            </p>
                            <CheckoutCart />
                            <CheckoutPriceSummary />
                            <Button
                                type="primary"
                                className="w-full mt-8"
                                disabled={cart.length === 0}
                            >
                                Continue & Pay
                            </Button>
                        </CheckoutSection>
                    ) : (
                        <CheckoutSection className="bg-white flex flex-col  p-6 rounded-md md:p-8 lg:w-1/3 lg:h-1/3">
                            <p className="text-[18px] leading-auto font-bold uppercase pb-8">
                                Summary
                            </p>
                            <p className="text-sm text-black/50">
                                Please add items to your cart
                            </p>
                            <Button
                                type="primary"
                                className="w-full mt-8"
                                disabled={cart.length === 0}
                            >
                                Continue & Pay
                            </Button>
                        </CheckoutSection>
                    )}
                </form>
            </div>
        </>
    );
}
