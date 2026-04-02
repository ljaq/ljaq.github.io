/** 笔直 1px 横线 */
export function SketchDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px w-full bg-[color:var(--grid-border-color)] ${className}`}
      aria-hidden
    />
  );
}
