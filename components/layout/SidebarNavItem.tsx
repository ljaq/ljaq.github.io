"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GridFrame } from "@/components/ui/GridFrame";

type SidebarNavItemProps = {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export function SidebarNavItem({
  href,
  icon,
  children,
}: SidebarNavItemProps) {
  const pathname = usePathname();
  const active =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <GridFrame active={active} className="mb-2">
      <Link
        href={href}
        className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium text-neutral-800 transition hover:text-neutral-950"
      >
        <span className="text-neutral-500 [&>svg]:stroke-[1.35]">{icon}</span>
        <span>{children}</span>
      </Link>
    </GridFrame>
  );
}
