"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

import { useBleedSyncRect } from "./useBleedSyncRect";

/** 视口全宽：fixed + inset-x-0（主栏 overflow 会裁切 absolute+100vw，无法铺满屏） */
function FixedBleedLine({ top }: { top: number }) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-[5] h-px bg-[color:var(--grid-border-color)]"
      style={{ top }}
      aria-hidden
    />
  );
}

type ContentBleedSectionProps = {
  children: ReactNode;
  className?: string;
  bleed?: "both" | "top" | "bottom" | "none";
};

export function ContentBleedSection({
  children,
  className = "",
  bleed = "both",
}: ContentBleedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const rect = useBleedSyncRect(sectionRef);

  const showTop =
    rect && bleed !== "none" && (bleed === "both" || bleed === "top");
  const showBot =
    rect && bleed !== "none" && (bleed === "both" || bleed === "bottom");

  return (
    <section ref={sectionRef} className={`relative ${className}`}>
      {showTop ? <FixedBleedLine top={rect.top} /> : null}
      {showBot ? <FixedBleedLine top={rect.bottom} /> : null}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

type BleedRuleProps = { className?: string };

export function BleedRule({ className = "" }: BleedRuleProps) {
  const markerRef = useRef<HTMLDivElement>(null);
  const rect = useBleedSyncRect(markerRef);

  return (
    <>
      <div
        ref={markerRef}
        className={`pointer-events-none h-0 w-full ${className}`}
        aria-hidden
      />
      {rect ? <FixedBleedLine top={rect.top} /> : null}
    </>
  );
}
