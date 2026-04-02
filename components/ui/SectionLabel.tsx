type SectionLabelProps = {
  index: string
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ index, children, className = '' }: SectionLabelProps) {
  return (
    <p className={`font-mono text-[11px] uppercase tracking-[0.32em] text-ink/40 h-0 ${className}`}>
      {index}_<span className='text-ink/65'>{children}</span>
    </p>
  )
}
