/** 45° 斜线底纹（pattern 10×10 + rotate(45) + line stroke 1.5） */
export function DiagonalHatch({
  className = '',
  patternId = 'diagonal-hatch',
}: {
  className?: string
  /** 同页多实例时需唯一 id */
  patternId?: string
}) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 z-0 size-full select-none text-grid-border opacity-60 ${className}`}
      aria-hidden
    >
      <defs>
        <pattern id={patternId} width='10' height='10' patternUnits='userSpaceOnUse' patternTransform='rotate(45)'>
          <line x1='0' y1='0' x2='0' y2='10' stroke='currentColor' strokeWidth='1.5' />
        </pattern>
      </defs>
      <rect width='100%' height='100%' fill={`url(#${patternId})`} />
    </svg>
  )
}
