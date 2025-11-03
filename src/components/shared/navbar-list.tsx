import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import categoryItems from "../../lib/data/category-items";

const NavbarList = ({
    className,
    setIsOpen,
}: {
    className?: string;
    setIsOpen: (isOpen: boolean) => void;
}) => {
    return (
        <section
            className={cn(
                "py-10 px-4 flex flex-col justify-between items-end  gap-4 md:pt-24 md:gap-24 md:pb-0 xl:pt-40",
                className
            )}
        >
            {Object.entries(categoryItems).map(([category, data], index) => (
                <figure
                    key={category}
                    className={"w-full "}
                    onClick={() => {
                        setIsOpen(false);
                    }}
                >
                    <Link
                        href={data.mobile.link}
                        className="flex flex-col items-center justify-center"
                    >
                        <picture className="-mb-26 z-10">
                            <source
                                media="(min-width: 1024px)"
                                srcSet={data.desktop.image}
                            />
                            <source
                                media="(min-width: 768px)"
                                srcSet={data.tablet.image}
                            />
                            <img
                                src={data.mobile.image}
                                alt={`${category} category`}
                            />
                        </picture>
                        <figcaption className="text-center w-full rounded-lg h-full bg-(--color-gray) pt-[88px] pb-[22px] px-[58px] flex flex-col items-center justify-center gap-4">
                            <p className="font-bold uppercase text-base tracking-[1px] md:text-sm">
                                {category}
                            </p>
                            <div className="flex items-center justify-center">
                                <h6 className="uppercase text-black/50 font-bold md:text-sm">
                                    shop
                                </h6>
                                <Image
                                    src="/assets/arrow-icon.svg"
                                    alt=""
                                    width={10}
                                    height={5}
                                    className="ml-3 md:w-1.5 md:h-2.5"
                                    aria-hidden="true"
                                />
                            </div>
                        </figcaption>
                    </Link>
                </figure>
            ))}
        </section>
    );
};

export default NavbarList;
