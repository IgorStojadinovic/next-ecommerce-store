"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function DesktopLinks() {
  const currentPath = usePathname();
  const links = [
      {
          href: "/",
          label: "home",
      },
      {
          href: "/products/headphones",
          label: "headphones",
      },
      {
          href: "/products/speakers",
          label: "speakers",
      },
      {
          href: "/products/earphones",
          label: "earphones",
      },
  ];
    return (
      <ul className="flex flex-1 justify-center items-center gap-9 uppercase font-bold">
      {links.map((link) => (
          <li key={link.href}>
              <Link
                  href={link.href}
                  className={
                      currentPath === link.href
                          ? "text-(--color-orange-primary)"
                          : "hover:text-(--color-orange-primary) transition-colors duration-300"
                  }
              >
                  {link.label}
              </Link>
          </li>
      ))}
  </ul>
    );
}