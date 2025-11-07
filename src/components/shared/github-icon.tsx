import Image from "next/image";
export default function GithubIcon() {
    return (
        <a
            href="https://github.com/IgorStojadinovic/next-ecommerce-store"
            target="_blank"
            rel="noopener noreferrer"
            title="View code on GitHub"
            className="fixed bottom-4 right-4 cursor-pointer hover:scale-110 transition-all duration-300"
        >
            <Image src="/github-mark.svg" alt="github" width={40} height={40} />
        </a>
    );
}
