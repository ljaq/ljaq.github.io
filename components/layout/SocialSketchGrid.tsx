import Link from "next/link";
import { GridFrame } from "@/components/ui/GridFrame";
import { IconGithub, IconMail, IconRss } from "@/components/icons/NavIcons";

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const items = [
  { href: "https://github.com", label: "GitHub", Icon: IconGithub },
  { href: "https://x.com", label: "X", Icon: IconX },
  { href: "mailto:you@example.com", label: "邮件", Icon: IconMail },
  { href: "/blog", label: "RSS", Icon: IconRss },
] as const;

export function SocialSketchGrid() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map(({ href, label, Icon }) => (
        <GridFrame key={label} fill className="min-h-[3.25rem]">
          <Link
            href={href}
            className="flex min-h-[3.25rem] w-full items-center justify-center text-neutral-600 transition hover:text-neutral-900"
            aria-label={label}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            <Icon className="size-5" />
          </Link>
        </GridFrame>
      ))}
    </div>
  );
}
