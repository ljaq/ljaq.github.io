"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function NavLink({ href, children, className = "" }: NavLinkProps) {
  const pathname = usePathname();
  const active =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition ${className} ${
        active
          ? "border border-[color:var(--grid-border-color)] bg-white text-neutral-900"
          : "border border-transparent text-neutral-500 hover:border-[color:var(--grid-border-color)] hover:bg-white/80 hover:text-neutral-900"
      }`}
    >
      {children}
    </Link>
  );
}
