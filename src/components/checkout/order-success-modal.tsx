"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Button from "../shared/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

type OrderSuccessModalProps = {
    isOpen: boolean;
    onClose: () => void;
    orderData: {
        id: number;
        totalAmount: string;
        itemCount: number;
    };
};

export default function OrderSuccessModal({
    isOpen,
    onClose,
    orderData,
}: OrderSuccessModalProps) {
    const router = useRouter();

    const handleGoHome = () => {
        onClose();
        router.push("/");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="flex flex-col gap-6 max-w-[540px] p-8 md:p-12">
                <div className="flex items-center justify-center">
                    <div className="rounded-full bg-[#D87D4A] p-4">
                        <Image
                            src="/assets/shared/desktop/icon-check-mark.svg"
                            alt="Success"
                            width={64}
                            height={64}
                        />
                    </div>
                </div>

                <DialogHeader className="items-start justify-between pt-4 flex-col gap-4">
                    <DialogTitle className="text-2xl md:text-[32px] leading-tight uppercase">
                        Thank you <br />
                        for your order
                    </DialogTitle>
                    <p className="text-[15px] text-black/50 font-medium normal-case">
                        You will receive an email confirmation shortly.
                    </p>
                </DialogHeader>

                <div className="flex flex-col md:flex-row rounded-lg overflow-hidden">
                    <div className="bg-[#F1F1F1] p-6 flex-1 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-black/50 uppercase">
                                    Order ID
                                </p>
                                <p className="text-sm font-bold">
                                    #{orderData.id}
                                </p>
                            </div>
                        </div>
                        <div className="border-t border-black/10 pt-3">
                            <p className="text-xs text-black/50 uppercase">
                                Items in order
                            </p>
                            <p className="text-sm font-bold">
                                {orderData.itemCount}{" "}
                                {orderData.itemCount === 1 ? "item" : "items"}
                            </p>
                        </div>
                    </div>
                    <div className="bg-black p-6 flex flex-col justify-center gap-2 md:min-w-[200px]">
                        <p className="text-xs text-white/50 uppercase">
                            Grand Total
                        </p>
                        <p className="text-lg font-bold text-white">
                            ${" "}
                            {parseFloat(orderData.totalAmount).toLocaleString()}
                        </p>
                    </div>
                </div>

                <Button
                    type="primary"
                    className="w-full mt-4"
                    onClick={handleGoHome}
                >
                    Back to home
                </Button>
            </DialogContent>
        </Dialog>
    );
}
