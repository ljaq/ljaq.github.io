import { CornerMarks } from './CornerMarks'

export type GridFrameProps = {
  children: React.ReactNode
  className?: string
  /** 侧栏当前项：白底 */
  active?: boolean
  /** 内容卡片白底（如 FAQ / 定价卡） */
  fill?: boolean
  /** 内侧第二条线：after:inset-0 + border */
  double?: boolean
  /** 四角「+」标（媒体/大图块） */
  corners?: boolean
  /** 悬浮时白底 */
  hover?: boolean
}

/**
 * 笔直 1px `border`，颜色 `--grid-border-color`，可选双线框与四角标记。
 */
export function GridFrame({ children, className = '', active, fill, double, corners, hover }: GridFrameProps) {
  const surface = active || fill ? 'bg-white' : 'bg-transparent'
  const hoverSurface = hover ? 'hover:bg-white' : ''
  return (
    <div
      className={`relative ${surface} ${hoverSurface} border border-[color:var(--grid-border-color)] m-[-1px] ${
        double
          ? 'after:pointer-events-none after:absolute after:inset-0 after:z-0 after:border after:border-[color:var(--grid-border-color)]'
          : ''
      } ${className}`}
    >
      {corners ? <CornerMarks /> : null}
      <div className='relative z-10'>{children}</div>
    </div>
  )
}
