import Link from "next/link";

const base =
  "inline-flex items-center justify-center border px-5 py-2.5 text-sm font-semibold transition select-none active:translate-x-px active:translate-y-px";

const variants = {
  primary:
    "border-neutral-900 bg-accent-magenta text-white shadow-sketch hover:bg-accent-magenta/90",
  outline:
    "border-[color:var(--grid-border-color)] bg-white text-neutral-900 hover:bg-neutral-50",
  ghost:
    "border-transparent bg-transparent text-neutral-800 underline decoration-dotted decoration-neutral-400 underline-offset-[5px] hover:bg-neutral-100/80",
} as const;

export type ButtonVariant = keyof typeof variants;

type ButtonProps = {
  href?: string;
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  external?: boolean;
};

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  type = "button",
  external,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const isExternal = external ?? /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={cls}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls}>
      {children}
    </button>
  );
}
