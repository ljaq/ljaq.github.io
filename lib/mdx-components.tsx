import type { MDXComponents } from "mdx/types";
import { MdxH2, MdxH3 } from "@/components/mdx/MdxBleedHeadings";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="mt-10 mb-4 text-3xl font-semibold tracking-tight text-ink first:mt-0 md:text-4xl"
      {...props}
    />
  ),
  h2: (props) => <MdxH2 {...props} />,
  h3: (props) => <MdxH3 {...props} />,
  p: (props) => <p className="mb-4 leading-relaxed text-ink/85" {...props} />,
  a: (props) => (
    <a
      className="text-accent-magenta underline decoration-dotted decoration-accent-magenta/50 underline-offset-[5px] transition hover:text-accent-magenta/90"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="mb-4 list-inside list-disc space-y-2 pl-1 text-ink/85" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-4 list-inside list-decimal space-y-2 pl-1 text-ink/85" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => (
    <strong className="font-semibold text-accent-red" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l border-[color:var(--grid-border-color)] pl-4 italic text-neutral-600"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-ink/6 px-1.5 py-0.5 font-mono text-[0.9em] text-ink"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mb-4 max-w-full overflow-x-auto border border-[color:var(--grid-border-color)] bg-neutral-100 p-4 font-mono text-sm"
      {...props}
    />
  ),
  hr: () => (
    <hr className="my-10 border-0 border-t border-[color:var(--grid-border-color)]" />
  ),
  img: (props) => (
    <span className="my-6 block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="h-auto max-w-full border border-[color:var(--grid-border-color)]"
        alt=""
        {...props}
      />
    </span>
  ),
};
