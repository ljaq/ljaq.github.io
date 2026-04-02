/** 媒体/区块四角：5×5「+」线标（浅色底用实色，不用 mix-blend） */
const PATH = "M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z";

export function CornerMarks() {
  const base =
    "pointer-events-none absolute z-20 h-[5px] w-[5px] text-[color:var(--grid-border-color)]";

  return (
    <>
      <svg
        className={`${base} left-[2px] top-[2px] lg:left-[4px] lg:top-[4px]`}
        viewBox="0 0 5 5"
        aria-hidden
      >
        <path fill="currentColor" d={PATH} />
      </svg>
      <svg
        className={`${base} right-[2px] top-[2px] lg:right-[4px] lg:top-[4px]`}
        viewBox="0 0 5 5"
        aria-hidden
      >
        <path fill="currentColor" d={PATH} />
      </svg>
      <svg
        className={`${base} bottom-[2px] left-[2px] lg:bottom-[4px] lg:left-[4px]`}
        viewBox="0 0 5 5"
        aria-hidden
      >
        <path fill="currentColor" d={PATH} />
      </svg>
      <svg
        className={`${base} bottom-[2px] right-[2px] lg:bottom-[4px] lg:right-[4px]`}
        viewBox="0 0 5 5"
        aria-hidden
      >
        <path fill="currentColor" d={PATH} />
      </svg>
    </>
  );
}
