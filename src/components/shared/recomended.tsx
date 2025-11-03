import { Recomendation } from "@/lib/data/recomendations";
import Button from "./button";
import Link from "next/link";
export default function Recomended({
    recomendations,
}: {
    recomendations: Recomendation[];
}) {
    return (
        <section className="">
            <h2 className=" text-center text-4xl font-bold md:pb-14 pb-10 lg:pb-16">
                you may also like
            </h2>
            <div className="flex flex-col items-center  md:gap-2.5 md:flex-row ">
                {recomendations.map((recomendation) => (
                    <RecomendationCard
                        key={recomendation.name}
                        recomendation={recomendation}
                    />
                ))}
            </div>
        </section>
    );
}

function RecomendationCard({
    recomendation,
}: {
    recomendation: Recomendation;
}) {
    return (
        <div className="flex flex-col items-center justify-center gap-6 md:gap-10 md:flex-1">
            <picture className="w-full">
                <source
                    media="(min-width: 1024px)"
                    srcSet={recomendation.image.desktop}
                />
                <source
                    media="(min-width: 768px)"
                    srcSet={recomendation.image.tablet}
                />
                <img
                    src={recomendation.image.mobile}
                    alt={recomendation.name}
                    className="rounded-lg w-full h-full object-cover"
                />
            </picture>
            <div className="flex flex-col items-center gap-8 w-full">
                <h3 className="font-bold text-2xl">{recomendation.name}</h3>
                <Link href={recomendation.href}>
                    <Button type="primary">see product</Button>
                </Link>
            </div>
        </div>
    );
}
