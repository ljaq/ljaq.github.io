import type { ReactNode } from 'react'

/**
 * 拉满视口宽度：`w-screen` + `margin-left: -var(--bleed-shift)`。
 * `--bleed-shift` 在 SiteShell 的 main 上按断点设为「视口左缘 → 分割线起点」的距离（侧栏偏移后 `calc(50%-50vw)` 不再成立）。
 */
export function FullBleedLine({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none relative z-5 h-px w-[150vw] max-w-[150vw] bg-grid-border ml-[calc(-1*var(--bleed-shift,0.5rem))] ${className}`}
      aria-hidden
    />
  )
}

type ContentBleedSectionProps = {
  children: ReactNode
  className?: string
  bleed?: 'both' | 'top' | 'bottom' | 'none'
}

export function ContentBleedSection({ children, className = '', bleed = 'both' }: ContentBleedSectionProps) {
  const showTop = bleed !== 'none' && (bleed === 'both' || bleed === 'top')
  const showBot = bleed !== 'none' && (bleed === 'both' || bleed === 'bottom')

  return (
    <section className={`relative ${className}`}>
      {showTop ? <FullBleedLine /> : null}
      <div className='relative z-10'>{children}</div>
      {showBot ? <FullBleedLine /> : null}
    </section>
  )
}

type BleedRuleProps = { className?: string }

export function BleedRule({ className = '' }: BleedRuleProps) {
  return (
    <div className={className}>
      <FullBleedLine />
    </div>
  )
}
