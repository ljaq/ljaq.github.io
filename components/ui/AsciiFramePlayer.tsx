'use client'

import { useEffect, useState } from 'react'
import { ASCII_FRAMES } from '@/lib/asciiFramesHome'

const FPS = 12
const INTERVAL_MS = 1000 / FPS

export function AsciiFramePlayer({ className }: { className?: string }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setI(prev => (prev + 1) % ASCII_FRAMES.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <p className={className} aria-hidden style={{ width: 584, overflow: 'hidden' }}>
      {ASCII_FRAMES[i]}
    </p>
  )
}
