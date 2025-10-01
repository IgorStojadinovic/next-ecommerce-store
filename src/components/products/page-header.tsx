export default function PageHeader({ title }: { title: string }) {
    return (
        <h1 className="bg-black text-white py-8 text-center border-none uppercase font-bold md:pt-28 md:pb-24 md:text-[40px] text-[28px]">
            {title}
        </h1>
    );
}