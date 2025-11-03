"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Button from "@/components/shared/button";
import CheckoutSection from "@/components/checkout/checkout-section";
import CheckoutBillingDetails from "@/components/checkout/checkout-billing-details";
import CheckoutPayment from "@/components/checkout/checkout-payment";
import CheckoutShoppingInfo from "@/components/checkout/checkout-shopping-info";
import CheckoutCart from "@/components/checkout/checkout-cart";
import CheckoutPriceSummary from "@/components/checkout/checkout-price-summary";
import { CheckoutFormValues, OrderResponse } from "@/lib/types";
import { useCartStore } from "@/store/providers/cart-store-provider";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import OrderSuccessModal from "@/components/checkout/order-success-modal";
import { toast } from "sonner";

export default function CheckoutPage() {
    const cart = useCartStore((state) => state.cart);
    const clearCart = useCartStore((state) => state.clearCart);
    const { register, handleSubmit, setValue } = useForm<CheckoutFormValues>({
        defaultValues: {
            paymentMethod: "card",
        },
    });
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderData, setOrderData] = useState<OrderResponse["order"] | null>(
        null
    );

    useEffect(() => {
        if (session?.user) {
            setValue("name", session.user.name || "");
            setValue("email", session.user.email || "");
            setValue("phone", session.user.phone || "");
            setValue("address", session.user.address || "");
            setValue("city", session.user.city || "");
            setValue("zip", session.user.zip || "");
            setValue("state", session.user.state || "");
            /*       setValue("paymentMethod", session.user.paymentMethod || ""); */
        }
    }, [session, setValue]);

    const onSubmit: SubmitHandler<CheckoutFormValues> = async (formData) => {
        if (cart.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        if (!session?.user) {
            toast.error("Please login to continue");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/orders/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cartItems: cart,
                    formData,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to create order");
            }

            const data: OrderResponse = await response.json();

            if (data.success) {
                setOrderData(data.order);
                setIsModalOpen(true);
                clearCart();
                toast.success("Order created successfully!");
            }
        } catch (error) {
            console.error("Error creating order:", error);
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to create order. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
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

                    <CheckoutSection className="bg-white flex flex-col  p-6 rounded-md md:p-8 lg:w-1/3 lg:h-1/3">
                        {cart.length > 0 ? (
                            <p className="text-[18px] leading-auto font-bold uppercase pb-8">
                                Summary
                            </p>
                        ) : (
                            <p className="text-sm text-black/50">
                                Please add items to your cart
                            </p>
                        )}
                        <CheckoutCart />
                        <CheckoutPriceSummary />
                        <Button
                            type="primary"
                            className="w-full mt-8"
                            disabled={isLoading || cart.length === 0}
                        >
                            {isLoading ? "Processing..." : "Continue & Pay"}
                        </Button>
                    </CheckoutSection>
                </form>
            </div>
            {orderData && (
                <OrderSuccessModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    orderData={orderData}
                />
            )}
        </>
    );
}
