'use client'

import type { ReactNode } from 'react'
import RoseCurveLoading from './RoseCurveLoading'
import { cn } from '@/lib/utils'

export type SpinProps = {
  /** 为 false 时不展示动画（用于包裹子内容时关闭遮罩） */
  spinning?: boolean
  /** 有子元素时：子元素为内容，旋转层叠在上方 */
  children?: ReactNode
  size?: 'small' | 'medium' | 'large'
  className?: string
  /** 遮罩层 className（仅 children 模式） */
  overlayClassName?: string
  /** 主色下方提示文案 */
  tip?: ReactNode
}

/**
 * 加载指示：内部使用 RoseCurveLoading；可单独使用，也可包裹内容并显示半透明遮罩。
 */
export function Spin({
  spinning = true,
  children,
  size = 'medium',
  className,
  overlayClassName,
  tip,
}: SpinProps) {
  if (children !== undefined && children !== null) {
    return (
      <div className={cn('relative', className)}>
        {children}
        {spinning ? (
          <div
            className={cn(
              'absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-background/55 backdrop-blur-[0.5px]',
              overlayClassName,
            )}
            role='status'
            aria-live='polite'
            aria-busy='true'
          >
            <RoseCurveLoading size={size} />
            {tip ? <span className='text-xs text-muted-foreground'>{tip}</span> : null}
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div
      className={cn('inline-flex flex-col items-center justify-center gap-2', className)}
      role='status'
      aria-live='polite'
      aria-busy={spinning}
    >
      {spinning ? <RoseCurveLoading size={size} /> : null}
      {tip ? <span className='text-xs text-muted-foreground'>{tip}</span> : null}
    </div>
  )
}
