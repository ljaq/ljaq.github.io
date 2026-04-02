"use client";

import { SidebarClock } from "./SidebarClock";

/** 底部设置区：跟随系统、语言、时间等 */
export function SidebarMeta() {
  return (
    <div className="space-y-3 text-[11px] text-neutral-500">
      <div className="flex items-center justify-between gap-2">
        <span className="shrink-0">主题</span>
        <select
          className="max-w-[9rem] cursor-pointer rounded-md border border-[color:var(--grid-border-color)] bg-white px-1.5 py-1 text-right text-[11px] text-neutral-800 outline-none"
          defaultValue="system"
          aria-label="主题"
        >
          <option value="system">跟随系统</option>
          <option value="light">浅色</option>
          <option value="dark">深色</option>
        </select>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="shrink-0">语言</span>
        <select
          className="max-w-[9rem] cursor-pointer rounded-md border border-[color:var(--grid-border-color)] bg-white px-1.5 py-1 text-right text-[11px] text-neutral-800 outline-none"
          defaultValue="zh-CN"
          aria-label="语言"
        >
          <option value="zh-CN">简体中文</option>
          <option value="en">English</option>
        </select>
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-[color:var(--grid-border-color)] pt-3">
        <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
          time
        </span>
        <SidebarClock />
      </div>
    </div>
  );
}
