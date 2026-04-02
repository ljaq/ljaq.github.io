import { GridFrame } from '@/components/ui/GridFrame'

type SketchFrameProps = {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'article'
  /** 媒体样式：双线 + 四角（默认关） */
  mediaStyle?: boolean
}

export function SketchFrame({ children, className = '', as: Tag = 'div', mediaStyle = false }: SketchFrameProps) {
  return (
    <GridFrame fill double={mediaStyle} corners={mediaStyle} className={`flex h-full min-h-0 flex-col ${className}`}>
      <Tag
        className={`flex min-h-0 flex-1 flex-col p-6 ${mediaStyle ? 'items-center justify-center text-center' : ''}`}
      >
        {children}
      </Tag>
    </GridFrame>
  )
}
