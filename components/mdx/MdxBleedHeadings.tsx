"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useRef } from "react";

import { useBleedSyncRect } from "@/components/layout/useBleedSyncRect";

function FixedBleedLine({ top }: { top: number }) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-[5] h-px bg-[color:var(--grid-border-color)]"
      style={{ top }}
      aria-hidden
    />
  );
}

export function MdxH2(props: ComponentPropsWithoutRef<"h2">) {
  const ref = useRef<HTMLHeadingElement>(null);
  const seg = useBleedSyncRect(ref);

  return (
    <>
      {seg ? (
        <>
          <FixedBleedLine top={seg.top} />
          <FixedBleedLine top={seg.bottom} />
        </>
      ) : null}
      <h2
        ref={ref}
        className="relative z-10 mt-10 mb-3 text-2xl font-medium tracking-[-0.035em] text-ink first:mt-0 md:text-[1.65rem]"
        {...props}
      />
    </>
  );
}

export function MdxH3(props: ComponentPropsWithoutRef<"h3">) {
  const ref = useRef<HTMLHeadingElement>(null);
  const seg = useBleedSyncRect(ref);

  return (
    <>
      {seg ? (
        <>
          <FixedBleedLine top={seg.top} />
          <FixedBleedLine top={seg.bottom} />
        </>
      ) : null}
      <h3
        ref={ref}
        className="relative z-10 mt-8 mb-2 text-xl font-medium tracking-[-0.03em] text-ink first:mt-0"
        {...props}
      />
    </>
  );
}
