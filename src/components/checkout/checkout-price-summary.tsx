import SummaryField from "./summary-field";

import { useCartStore } from "@/store/providers/cart-store-provider";
export default function CheckoutPriceSummary() {
    const cart = useCartStore((state) => state.cart);
    const total = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const shipping = cart.length > 0 ? 50 : 0;
    const vat = (cart.length > 0 ? total * 0.1 : 0).toFixed(0);
    const grandTotal = cart.length > 0 ? total + shipping + parseFloat(vat) : 0;

    return (
        <>
            <SummaryField label="Total" value={total.toString()} />
            <SummaryField label="Shipping" value={shipping.toString()} />
            <SummaryField label="VAT (included)" value={vat.toString()} />
            <SummaryField label="Grand Total" value={grandTotal.toString()} />
        </>
    );
}
