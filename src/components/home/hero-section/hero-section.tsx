import HeroArticle from "./hero-article";

export default function HeroSection() {
    return (
        <section className="overflow-hidden flex flex-col items-center justify-center h-[600px] relative z-10 md:min-h-[724px] xl:min-h-[729px] lg:items-start lg:bg-[#191919] md:px-10 xl:px-[256px]">
            <HeroArticle />
        </section>
    );
}
