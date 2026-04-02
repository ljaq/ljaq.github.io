import Link from "next/link";
import Image from "next/image";

/** 简笔图形 + 字标 */
export function SiteLogo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <Image src="/logo.svg" alt="logo" width={36} height={36} />
      <span className="text-lg font-bold lowercase tracking-tight text-ink">
        李佳棋
      </span>
    </Link>
  );
}
