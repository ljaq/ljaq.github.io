import Link from 'next/link'
import Image from 'next/image'
import { GridFrame, SectionLabel } from '@/components/ui'

/** 简笔图形 + 字标 */
export function SiteLogo() {
  return (
    <div>
      <SectionLabel>logo</SectionLabel>
      <GridFrame corners hover className='mb-2 border-l-0 border-r-0'>
        <Link href='/' className='group flex items-center gap-1 px-4 h-14'>
          <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/logo.svg`} alt='logo' width={36} height={36} />
          <span className='text-lg tracking-tight text-ink font-mono'>李佳棋</span>
        </Link>
      </GridFrame>
    </div>
  )
}
