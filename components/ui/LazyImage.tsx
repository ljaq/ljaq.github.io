'use client'

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ImgHTMLAttributes,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import {
  Download,
  Maximize2,
  RefreshCw,
  RotateCcw,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
  Eye
} from 'lucide-react'
import { Spin } from '@/components/ui/Spin'
import { cn } from '@/lib/utils'

export type LazyImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string
  alt: string
  /** 进入视口前预加载距离 */
  rootMargin?: string
  /** 未加载完成时的最小高度，避免布局塌陷 */
  placeholderMinHeight?: string | number
  spinSize?: 'small' | 'medium' | 'large'
  /** 悬停遮罩 + 全屏预览（下载 / 缩放 / 旋转 / 拖动） */
  enableLightbox?: boolean
}

const MIN_SCALE = 0.25
const MAX_SCALE = 5
const ZOOM_STEP = 0.15
const ROTATE_STEP = 90

async function downloadImageFile(url: string, filename: string) {
  const safe = filename.replace(/[^\w.\-\u4e00-\u9fff]/g, '_') || 'image'
  try {
    const res = await fetch(url, { mode: 'cors' })
    if (!res.ok) throw new Error('fetch failed')
    const blob = await res.blob()
    const objectUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = objectUrl
    a.download = safe.includes('.') ? safe : `${safe}.png`
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(objectUrl)
  } catch {
    const a = document.createElement('a')
    a.href = url
    a.download = safe
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }
}

type LightboxProps = {
  open: boolean
  onClose: () => void
  src: string
  alt: string
}

function ImageLightbox({ open, onClose, src, alt }: LightboxProps) {
  const titleId = useId()
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [tx, setTx] = useState(0)
  const [ty, setTy] = useState(0)
  const dragRef = useRef<{
    active: boolean
    px: number
    py: number
    startTx: number
    startTy: number
  } | null>(null)
  const txRef = useRef(0)
  const tyRef = useRef(0)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    txRef.current = tx
  }, [tx])
  useEffect(() => {
    tyRef.current = ty
  }, [ty])

  useEffect(() => {
    if (!open) return
    setScale(1)
    setRotation(0)
    setTx(0)
    setTy(0)
  }, [open, src])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === '+' || e.key === '=') {
        e.preventDefault()
        setScale(s => Math.min(MAX_SCALE, s + ZOOM_STEP))
      }
      if (e.key === '-' || e.key === '_') {
        e.preventDefault()
        setScale(s => Math.max(MIN_SCALE, s - ZOOM_STEP))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const resetView = useCallback(() => {
    setScale(1)
    setRotation(0)
    setTx(0)
    setTy(0)
  }, [])

  useEffect(() => {
    const el = stageRef.current
    if (!el || !open) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
      setScale(s => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s + delta)))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [open])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = {
      active: true,
      px: e.clientX,
      py: e.clientY,
      startTx: txRef.current,
      startTy: tyRef.current,
    }
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current
    if (!d?.active) return
    const dx = e.clientX - d.px
    const dy = e.clientY - d.py
    setTx(d.startTx + dx)
    setTy(d.startTy + dy)
  }, [])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
    if (dragRef.current) dragRef.current.active = false
  }, [])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      className='fixed inset-0 z-200 flex flex-col bg-black/92 backdrop-blur-[2px]'
      role='dialog'
      aria-modal='true'
      aria-labelledby={titleId}
    >
      <div
        className='flex shrink-0 flex-wrap items-center gap-1 border-b border-white/10 px-2 py-2 sm:gap-2 sm:px-3'
        onClick={e => e.stopPropagation()}
      >
        <span id={titleId} className='mr-auto max-w-[40%] truncate pl-1 text-xs text-white/80 sm:text-sm'>
          {alt || '图片预览'}
        </span>
        <ToolbarIconButton label='缩小' onClick={() => setScale(s => Math.max(MIN_SCALE, s - ZOOM_STEP))}>
          <ZoomOut className='size-4' />
        </ToolbarIconButton>
        <span className='min-w-12 text-center font-mono text-xs text-white/70'>
          {Math.round(scale * 100)}%
        </span>
        <ToolbarIconButton label='放大' onClick={() => setScale(s => Math.min(MAX_SCALE, s + ZOOM_STEP))}>
          <ZoomIn className='size-4' />
        </ToolbarIconButton>
        <ToolbarIconButton label='逆时针旋转' onClick={() => setRotation(r => r - ROTATE_STEP)}>
          <RotateCcw className='size-4' />
        </ToolbarIconButton>
        <ToolbarIconButton label='顺时针旋转' onClick={() => setRotation(r => r + ROTATE_STEP)}>
          <RotateCw className='size-4' />
        </ToolbarIconButton>
        <ToolbarIconButton label='重置视图' onClick={resetView}>
          <RefreshCw className='size-4' />
        </ToolbarIconButton>
        <ToolbarIconButton
          label='下载'
          onClick={() => downloadImageFile(src, `${alt || 'image'}.png`)}
        >
          <Download className='size-4' />
        </ToolbarIconButton>
        <ToolbarIconButton label='关闭' onClick={onClose} className='ml-auto sm:ml-0'>
          <X className='size-4' />
        </ToolbarIconButton>
      </div>

      <div
        ref={stageRef}
        className='relative min-h-0 flex-1 cursor-grab touch-none overflow-hidden active:cursor-grabbing'
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={e => e.stopPropagation()}
      >
        <div className='pointer-events-none flex h-full w-full items-center justify-center p-4'>
          <div
            className='will-change-transform'
            style={{ transform: `translate(${tx}px, ${ty}px)` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              draggable={false}
              className='max-h-[85vh] max-w-full select-none object-contain'
              style={{
                transform: `rotate(${rotation}deg) scale(${scale})`,
                transformOrigin: 'center center',
              }}
            />
          </div>
        </div>
      </div>

      <p
        className='shrink-0 border-t border-white/10 px-3 py-2 text-center text-[10px] text-white/45 sm:text-xs'
        onClick={e => e.stopPropagation()}
      >
        滚轮缩放 · 拖动平移 · +/- 键缩放 · Esc 关闭
      </p>
    </div>,
    document.body,
  )
}

function ToolbarIconButton({
  children,
  label,
  onClick,
  className,
}: {
  children: ReactNode
  label: string
  onClick: () => void
  className?: string
}) {
  return (
    <button
      type='button'
      aria-label={label}
      title={label}
      onClick={e => {
        e.stopPropagation()
        onClick()
      }}
      className={cn(
        'inline-flex size-9 shrink-0 items-center justify-center rounded border border-white/15 bg-white/5 text-white/90 transition hover:bg-white/15',
        className,
      )}
    >
      {children}
    </button>
  )
}

/**
 * 进入视口后才开始请求图片；加载中用 Spin 占位。
 * 可选：悬停显示「全屏预览」遮罩，点击进入全屏（缩放、旋转、拖动、下载）。
 */
export function LazyImage({
  src,
  alt,
  className,
  rootMargin = '200px 0px',
  placeholderMinHeight = '12rem',
  spinSize = 'large',
  enableLightbox = true,
  onLoad,
  onError,
  ...imgProps
}: LazyImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold: 0.01 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  const minH =
    typeof placeholderMinHeight === 'number' ? `${placeholderMinHeight}px` : placeholderMinHeight
  const holdSize = !loaded && !failed
  const showLightboxUi = enableLightbox && loaded && !failed

  return (
    <div
      ref={wrapRef}
      className={cn(
        'group relative block w-full overflow-hidden',
        !shouldLoad && 'bg-muted/20',
        className,
      )}
      style={holdSize ? { minHeight: minH } : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {shouldLoad && !loaded && !failed ? (
        <div className='absolute inset-0 z-10 flex items-center justify-center bg-muted/25'>
          <Spin size={spinSize} />
        </div>
      ) : null}

      {shouldLoad && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading='eager'
          decoding='async'
          className={cn(
            'block h-auto w-full max-w-full transition-opacity duration-300',
            loaded ? 'opacity-100' : 'opacity-0',
            showLightboxUi && 'cursor-zoom-in',
          )}
          onLoad={e => {
            setLoaded(true)
            onLoad?.(e)
          }}
          onError={e => {
            setFailed(true)
            onError?.(e)
          }}
          {...imgProps}
        />
      ) : null}

      {showLightboxUi ? (
        <button
          type='button'
          aria-label='预览'
          className={cn(
            'absolute inset-0 z-20 flex flex-col items-center justify-center gap-1 border-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent p-4 text-white transition-opacity duration-200',
            hover ? 'opacity-100' : 'opacity-0',
            'focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-magenta cursor-pointer',
          )}
          onClick={() => setLightboxOpen(true)}
        >
          <Eye className='size-4' />
          <span className='text-sm tracking-wide drop-shadow'>预览</span>
        </button>
      ) : null}

      {failed ? (
        <div className='flex min-h-32 items-center justify-center bg-muted/30 px-3 py-6 text-center text-xs text-muted-foreground'>
          图片加载失败
        </div>
      ) : null}

      {showLightboxUi ? (
        <ImageLightbox open={lightboxOpen} onClose={() => setLightboxOpen(false)} src={src} alt={alt} />
      ) : null}
    </div>
  )
}
