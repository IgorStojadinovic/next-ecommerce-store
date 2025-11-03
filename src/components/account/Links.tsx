"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
export default function AccountLinks() {
  const links = [
    {
        label: "Personal Information",
        href: "/account",
    },

    {
        label: "Orders",
        href: "/account/orders",
    },
    {
        label: "Address",
        href: "/account/address",
    },
];
    return (
      <ul className="flex flex-col gap-10 mt-8 border border-black p-10 rounded-md">
      {links.map((link) => (
          <li key={link.href}>
              <Link
                  href={link.href}
                  className="hover:underline"
              >
                  {link.label}
              </Link>
          </li>
      ))}
      <li>
          <button
              onClick={() => signOut()}
              className="hover:underline cursor-pointer"
          >
              Logout
          </button>
      </li>
  </ul>
    );
}