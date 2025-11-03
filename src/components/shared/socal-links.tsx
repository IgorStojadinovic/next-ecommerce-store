import Image from "next/image";
import { cn } from "@/lib/utils";
export default function SocialLinks({ className }: { className?: string }) {
    return (
        <ul
            className={cn(
                `flex items-center justify-center gap-4 ${className}`
            )}
        >
            <li>
                <Image
                    src="/facebook-icon.svg"
                    alt="facebook"
                    width={24}
                    height={24}
                    className="transition-colors hover:[filter:invert(54%)_sepia(94%)_saturate(749%)_hue-rotate(341deg)_brightness(101%)_contrast(101%)] cursor-pointer"
                />
            </li>
            <li>
                <Image
                    src="/twitter-icon.svg"
                    alt="twitter"
                    width={24}
                    height={24}
                    className="transition-colors hover:[filter:invert(54%)_sepia(94%)_saturate(749%)_hue-rotate(341deg)_brightness(101%)_contrast(101%)] cursor-pointer"
                />
            </li>
            <li>
                <Image
                    src="/instagram-icon.svg"
                    alt="instagram"
                    width={24}
                    height={24}
                    className="transition-colors hover:[filter:invert(54%)_sepia(94%)_saturate(749%)_hue-rotate(341deg)_brightness(101%)_contrast(101%)] cursor-pointer"
                />
            </li>
        </ul>
    );
}
