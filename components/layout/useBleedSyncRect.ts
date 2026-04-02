"use client";

import type { RefObject } from "react";
import { useLayoutEffect, useState } from "react";

function getScrollAncestor(el: HTMLElement | null): Element | Window {
  if (!el) return window;
  let node: HTMLElement | null = el.parentElement;
  while (node) {
    const { overflow, overflowY, overflowX } = getComputedStyle(node);
    if (
      overflowY === "auto" ||
      overflowY === "scroll" ||
      overflowY === "overlay" ||
      overflowX === "auto" ||
      overflowX === "scroll" ||
      overflow === "auto" ||
      overflow === "scroll"
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return window;
}

/**
 * 锚点相对视口的上下边，用于 fixed 全屏宽横线的 top（主栏 overflow 会裁切 absolute+100vw，故需 fixed）。
 */
export function useBleedSyncRect(ref: RefObject<HTMLElement | null>) {
  const [rect, setRect] = useState<{ top: number; bottom: number } | null>(
    null,
  );

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sync = () => {
      const r = el.getBoundingClientRect();
      setRect({ top: r.top, bottom: r.bottom });
    };

    const scrollAncestor = getScrollAncestor(el);

    sync();

    scrollAncestor.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    window.addEventListener("orientationchange", sync);

    const ro = new ResizeObserver(sync);
    ro.observe(el);
    if (scrollAncestor instanceof HTMLElement) {
      ro.observe(scrollAncestor);
    }

    return () => {
      scrollAncestor.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      window.removeEventListener("orientationchange", sync);
      ro.disconnect();
    };
  }, [ref]);

  return rect;
}
