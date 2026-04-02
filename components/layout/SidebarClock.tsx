'use client'

import { useEffect, useState } from 'react'
import { SketchDivider } from './SketchDivider'

export function SidebarClock() {
  const [time, setTime] = useState<string>('')
  const [date, setDate] = useState<string>('')

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('zh-CN', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      )
    setDate(
      new Date().toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    )
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className='mt-12'>
      <span className='font-mono text-[10px] uppercase tracking-wider text-neutral-400 h-0 flex items-end'>time</span>
      <SketchDivider />
      <div className='flex items-center justify-between gap-2 mt-2 px-4'>
        <span className='font-mono text-[11px] tabular-nums tracking-tight text-neutral-800'>{date || '—-—-—'}</span>
        <span className='font-mono text-[11px] tabular-nums tracking-tight text-neutral-500'>{time || '—:—:—'}</span>
      </div>
    </div>
  )
}
