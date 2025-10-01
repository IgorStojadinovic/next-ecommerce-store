import { ProductItem } from "./types";

const HeadphoneItems: ProductItem[] = [
    {
        name: "XX99 Mark II Headphones",
        description:
            "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
        price: 2999,
        new: true,
        images: {
            mobile: "/assets/shared/mobile/image-xx99-mark-two-headphones.jpg",
            tablet: "/assets/shared/tablet/image-xx99-mark-two-headphones.jpg",
            desktop:
                "/assets/shared/desktop/image-xx99-mark-two-headphones.jpg",
        },
        href: "/products/headphones/mark-II",
    },
    {
        name: "XX99 Mark I Headphones",
        description:
            "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.",
        price: 1999,
        new: false,
        images: {
            mobile: "/assets/shared/mobile/image-xx99-mark-one-headphones.jpg",
            tablet: "/assets/shared/tablet/image-xx99-mark-one-headphones.jpg",
            desktop:
                "/assets/shared/desktop/image-xx99-mark-one-headphones.jpg",
        },
        href: "/products/headphones/mark-I",
    },
    {
        name: "XX59 Headphones",
        description:
            "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
        price: 599,
        new: false,
        images: {
            mobile: "/assets/shared/mobile/image-xx59-headphones.jpg",
            tablet: "/assets/shared/tablet/image-xx59-headphones.jpg",
            desktop: "/assets/shared/desktop/image-xx59-headphones.jpg",
        },
        href: "/products/headphones/xx59",
    },
];

const SpeakerItems: ProductItem[] = [
    {
        name: "ZX9 Speaker",
        description:
            "Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
        price: 4399,
        new: true,
        images: {
            mobile: "/assets/shared/mobile/image-zx9-speaker.jpg",
            tablet: "/assets/shared/tablet/image-zx9-speaker.jpg",
            desktop: "/assets/shared/desktop/image-zx9-speaker.jpg",
        },
        href: "/products/speakers/zx9",
    },

    {
        name: "ZX7 Speaker",
        description:
            "Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
        price: 3999,
        new: false,
        images: {
            mobile: "/assets/shared/mobile/image-zx7-speaker.jpg",
            tablet: "/assets/shared/tablet/image-zx7-speaker.jpg",
            desktop: "/assets/shared/desktop/image-zx7-speaker.jpg",
        },
        href: "/products/speakers/zx7",
    },
];

const EarphoneItems: ProductItem[] = [
    {
        name: "YX1 WIRELESS EARPHONES",
        description:
            "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
        price: 599,
        new: true,
        images: {
            mobile: "/assets/shared/mobile/image-yx1-earphones.jpg",
            tablet: "/assets/shared/tablet/image-yx1-earphones.jpg",
            desktop: "/assets/shared/desktop/image-yx1-earphones.jpg",
        },
        href: "/products/earphones/wireless-earphones-y1",
    },

];

export { HeadphoneItems, SpeakerItems, EarphoneItems };
