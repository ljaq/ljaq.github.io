type SectionLabelProps = {
  index?: string
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ index, children, className = '' }: SectionLabelProps) {
  return (
    <p className={`font-mono text-[11px] uppercase tracking-[0.32em] h-0 flex items-end text-neutral-400 leading-none ${className}`}>
      {index ? `${index}_` : ''}<span>{children}</span>
    </p>
  )
}
